import { ReviewEntryComponent } from "./ReviewEntry.js"
import { getReviews, useReviews } from "./ReviewDataProvider.js"
import { useProducts } from "../products/ProductProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userReviews")

let customerReviews = []

export const ReviewList = () => {
    getReviews()
        .then(() => {
            customerReviews = useReviews()
            render()
        })
}

const render = () => {
    const reviewsHtmlRepresentation = customerReviews.map(review => ReviewEntryComponent(review)).join("")

    contentContainer.innerHTML = `
    <div id="orders__modal" class="modal--parent">
          <div class="modal--content">
          <h3>Reviews</h3>
          ${reviewsHtmlRepresentation}
          <button id="modal--close">Close</button>
          </div>
      </div>
        `
}

eventHub.addEventListener("ReviewsClicked", event => {
    console.log("this is in reviewList.js --- Review click heard")
    const selectedProductId = event.detail.productId
    const productArray = useProducts()
    const selectedProduct = productArray.filter((product) => product.id === selectedProductId)
    ReviewList(selectedProduct)
})

eventHub.addEventListener("click", event => {
    if (event.target.id === "modal--close") {
        closeModal()
    }
})

const closeModal = () => {
    contentContainer.innerHTML = ""
}