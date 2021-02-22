import { bakeryAPI } from "../Settings.js"

let reviews = []

export const getReviews = () => {
    return fetch(`${bakeryAPI.baseURL}/productReviews?_expand=rating`)
        .then(response => response.json())
        .then(parsedReviews => {
            reviews = parsedReviews
        })
}

export const useReviews = () => reviews.slice()


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