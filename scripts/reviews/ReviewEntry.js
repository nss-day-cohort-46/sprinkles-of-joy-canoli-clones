import { deleteReviews } from "./ReviewDataProvider.js"

// This is HTML format for how the review will render to the dom
export const ReviewEntryComponent = (review) => {
    return ` 
        <section id="review--${review.id}" class="reviewEntry">
            <div class="reviewText">Review: ${review.review}</div>
            <div class="reviewRating">${review.rating.label}</div>
            <button class="review__modal--delete" id="deleteButton--${review.id}">Delete</button>
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