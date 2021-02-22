import { bakeryAPI } from "../Settings.js"

let reviews = []

export const useReviews = () => reviews.slice()

// Since we are not posting all reviews we are passing in productId to only return reviews that match the selected product
// this is filtering reviews so I don't have to later
export const getReviews = (productId) => {
    return fetch(`${bakeryAPI.baseURL}/productReviews?_expand=rating&productId=${productId}`)
        .then(response => response.json())
        .then(parsedReviews => {
            reviews = parsedReviews
        })
}



export const saveReview = (review) => {
    return fetch(`${bakeryAPI.baseURL}/productReviews?_expand=rating`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
        .then(() => getReviews())  // <-- Get all reviews
        .then()
}