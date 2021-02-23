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
            render(productId)
        })
}

// this is the format passing in all reviews
const render = (productId) => {
    const reviewsHtmlRepresentation = customerReviews.map(review => ReviewEntryComponent(review)).join("")

    contentContainer.innerHTML = `
    <div id="orders__modal" class="modal--parent">
          <div class="modal--content">
          <h3>Reviews</h3>
          <input type="hidden" id="hiddenProductId" value="${productId}">
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

// event listening for any state change and gets productId from hidden input in the content container above in the render
eventHub.addEventListener("reviewStateChanged", event => {
    const productId = document.getElementById("hiddenProductId").value
    if (contentContainer.innerHTML !== "") {
        ReviewList(productId)
    }
})