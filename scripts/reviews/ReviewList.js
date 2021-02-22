import { ReviewEntryComponent } from "./ReviewEntry.js"
import { getReviews, useReviews } from "./ReviewDataProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userReviews")

let customerReviews = []

// passing in productId of selected product. I get this information from the click event details.
export const ReviewList = (productId) => {
    getReviews(productId)
        .then(() => {
            customerReviews = useReviews()
            render()
        })
}

// this is the format passing in all reviews
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

// listening for click from Product.js and passes the produtId into the ReviewList so it will pass that arguement in the get and only return reviews for that product
eventHub.addEventListener("ReviewsClicked", event => {
    const selectedProductId = event.detail.productId
    ReviewList(parseInt(selectedProductId))
})

eventHub.addEventListener("click", event => {
    if (event.target.id === "modal--close") {
        closeModal()
    }
})

const closeModal = () => {
    contentContainer.innerHTML = ""
}