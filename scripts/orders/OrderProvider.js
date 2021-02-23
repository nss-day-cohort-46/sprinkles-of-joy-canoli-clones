import { bakeryAPI } from "../Settings.js"
import { Order } from "./Order.js"
import { OrderList } from "./OrderList.js"
import { saveOrderProducts } from "./OrderProductProvider.js"

const eventHub = document.querySelector("#container")

let orders = []

export const useOrders = () => orders.slice()

export const getOrders = (customerId) => {
  //now grabs orders that have a customerid equal to what is being passed through
  return fetch(`${bakeryAPI.baseURL}/orders?_expand=status&customerId=${customerId}`)
    .then(response => response.json())
    .then(parsedResponse => {
      orders = parsedResponse
    })
}

export const saveOrder = (order, productsInOrder) => {
  return fetch(`${bakeryAPI.baseURL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then(res => res.json())
    // passed createdOrder in the .then so that it passes through the orderId
    .then((createdOrder) => {
      const orderProducts = productsInOrder.map(product => {
        return {
          "orderId": createdOrder.id,
          "productId": product.id
        }
      })
      return saveOrderProducts(orderProducts)
    })
    .then(() => getOrders())
    .then(dispatchStateChangeEvent)
}

//deletes the orders from the api 
export const deleteOrder = orderId => {
  return fetch(`${bakeryAPI.baseURL}/orders/${orderId}`, {
    method: "DELETE"
  })
    .then(getOrders)
    .then(OrderList)
}

//listens for delete button click and then invokes function that does the deltion
eventHub.addEventListener("deleteOrderButtonClicked", event => {
  deleteOrder(event.detail.orderToBeDeleted)
})


const dispatchStateChangeEvent = () => {
  const ordersStateChangedEvent = new CustomEvent("ordersStateChanged")

  eventHub.dispatchEvent(ordersStateChangedEvent)
}
