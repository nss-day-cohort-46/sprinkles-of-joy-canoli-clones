const eventHub = document.querySelector("#container")

export const Order = (customerOrder) => {
  let deleteButton =""
  if (customerOrder.status.id === 1){
    deleteButton =`<button id="orderDelete" value="${customerOrder.id}">Delete</button>`
  }
  return `
    <div class="order">
      <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}</p>
      <p> products</p>
      <p>${customerOrder.status.label}</p>
      ${deleteButton}
    </div>
  `
}

//listens for delete button click 
eventHub.addEventListener("click", event => {
  if (event.target.id === "orderDelete") {
    const orderDelete = new CustomEvent("deleteOrderButtonClicked", {
      detail: {
        orderToBeDeleted: event.target.value
      }
    })
  
  eventHub.dispatchEvent(orderDelete)
  }
})