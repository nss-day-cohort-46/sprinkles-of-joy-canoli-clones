let reviews = []

export const getReviews = () => {
    return fetch("http://localhost:8088/productReviews?_expand=rating")
        .then(response => response.json())
        .then(parsedReviews => {
            reviews = parsedReviews
        })
}

export const useReviews = () => {
    return reviews.slice
}


export const saveReview = (review) => {
    return fetch("http://localhost:8088/productReviews?_expand=rating", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
        .then(() => getReviews())  // <-- Get all reviews
}
