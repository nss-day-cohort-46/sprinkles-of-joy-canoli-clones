import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { Order } from "./Order.js"
import { getOrders, useOrders } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userOrders")

let customerOrders = []
// let customersId = sessionStorage.getItem("soj-customer-id")

export const OrderList = () => {
  if (authHelper.isUserLoggedIn()) {
    // getCustomer()
    debugger
    getOrders(authHelper.getCurrentUserId)
      .then(() => {
        customerOrders = useOrders()
        render()
      })
  }
}

const render = () => {
  const ordersHtmlRepresentation = customerOrders.map(order => Order(order)).join("")

  contentContainer.innerHTML = `
  <div id="orders__modal" class="modal--parent">
        <div class="modal--content">
        <h3>Previous Orders</h3>
        <div>
        <h5>Ordered on</h5>
        ${ordersHtmlRepresentation}
        </div>
        <button id="modal--close">Close</button>
        </div>
    </div>
      `
}

eventHub.addEventListener("showPastOrders", () => {
  OrderList()
  // customerOrders = useOrders()
  // const userLoggedIn = customersId
  // debugger
  // const ordersObject = customerOrders.filter(
  //   order => {
  //     if (ordersObject.customerId === customersId) {
  //         return true
  //     }
  //   })
    // render(ordersObject, customerOrders, userLoggedIn)
})

eventHub.addEventListener("click", event => {
  if (event.target.id === "modal--close") {
    closeModal()
  }
})

const closeModal = () => {
  contentContainer.innerHTML = ""
}
