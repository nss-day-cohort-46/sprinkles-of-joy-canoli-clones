import { deleteReviews } from "./ReviewDataProvider.js"
import { authHelper } from "../auth/authHelper.js"

let currentCustomerId = sessionStorage.getItem("soj-customer-id")


// This is HTML format for how the review will render to the dom
// Refactored the delete button so that only the loggedin user can delete reviews that they posted
export const ReviewEntryComponent = (review) => {
    let deleteButton = ""
    debugger
    if (review.customerId === parseInt(currentCustomerId)) {
        deleteButton = `<button class="review__modal--delete" id="deleteButton--${review.id}">Delete</button>`
    }
    return ` 
        <section id="review--${review.id}" class="reviewEntry">
            <div class="reviewText">${review.review}</div>
            <div class="reviewRating">${review.rating.label}</div>
            ${deleteButton}
        </section>
            `
}

// event listener for deleting reviews
const eventHub = document.querySelector('#container')

eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteButton--")) {
        const [prefix, reviewId] = event.target.id.split("--")
        deleteReviews(reviewId)
    }
})
