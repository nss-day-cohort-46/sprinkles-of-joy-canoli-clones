import { getProducts, useProducts } from "../products/ProductProvider.js"
import { getRatings, useRatings } from "./RatingDataProvider.js"
import { saveReview } from "./ReviewDataProvider.js"
import { authHelper } from "../auth/authHelper.js"

const contentTarget = document.querySelector(".reviewForm")
const eventHub = document.querySelector("#container")
let customerId = sessionStorage.getItem("soj-customer-id")

// This function gets and uses the products and ratings from their dataproviders/api's. They are assigned to variables.
// After that information is retrieved the form for leaving a review is created 
const render = () => {
    getProducts()
        .then(() => getRatings())
        .then(() => {
            const allRatings = useRatings()
            const allProducts = useProducts()

            contentTarget.innerHTML = `
            <div id="orders__modal" class="modal--parent">
            <div class="modal--content">
                <form class="formContainer">
                    <div class="productSelectSection">
                     <label for="productReviewed">Product</label>
                        <select class="productReviewed" name="productReviewed" id="productReviewed">
                             <option value="0">Select Product</option>
                             ${allProducts.map((product) => {
                return `<option value="${product.id}">${product.name}</option>`
            }).join("")
                }
                        </select>
                    </div>

                    <div class="ratingSection">
                     <label for="rating">Rating</label>
                        <select class="rating" name="rating" id="rating">
                             <option value="0">Select Rating</option>
                             ${allRatings.map((rating) => {
                    return `<option value="${rating.id}">${rating.label}</option>`
                }).join("")
                }
                        </select>
                    </div>

                    <div class="reviesSection">
                    <label for="reviewText">Write your Review here:</label>
                        <textarea class="reviewText" id="reviewText"></textarea>
                    </div>

                    <button class="saveReviewButton" id="saveReview" type="button">Save Review</button>
                </form>
                <button id="modal--close">Close</button>
                </div>
                </div>
        `
        })
}

const ReviewFormComponent = () => {
    render()
}

// this eventHub listens for the click of the save button & gets the value and sends them to ReviewDataProvider
eventHub.addEventListener("click", clickEvent => {
    if (authHelper.isUserLoggedIn()) {
        if (clickEvent.target.id === "saveReview") {
            clickEvent.preventDefault()
            const newReview = {
                "review": document.querySelector("#reviewText").value,
                "ratingId": parseInt(document.querySelector("#rating").value),
                "productId": parseInt(document.querySelector("#productReviewed").value),
                "customerId": parseInt(customerId)
            }
            // debugger
            saveReview(newReview)
                .then(() => {
                    document.querySelector(".formContainer").reset()
                })
        }
    }
})

// this listens for the click of the <a> tag of New Review. After New Review is clicked the ReviewFormComponent function 
// from this module runs, which runs the render funtion. The render function gets the products and ratings from the api and creates the form.
// Basically this listens for the link to be clicked then renders the form to the DOM
eventHub.addEventListener("showNewReviewForm", event => {
    ReviewFormComponent()
})

eventHub.addEventListener("click", event => {
    if (event.target.id === "modal--close") {
        closeModal()
    }
})

const closeModal = () => {
    contentTarget.innerHTML = ""
}