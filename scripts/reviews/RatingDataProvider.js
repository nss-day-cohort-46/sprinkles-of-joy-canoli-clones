let rating = []

// creating a fetch call to get the rating array from the api

export const getRatings = () => {
    return fetch("http://localhost:8088/ratings")
        .then(response => response.json())
        .then(parsedRatings => {
            rating = parsedRatings
        })
}

export const useRatings = () => {
    return rating.slice()
}


export const saveRating = (rating) => {
    return fetch("http://localhost:8088/productReviews?_expand=rating", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rating)
    })
        .then(() => getRatings())  // <-- Get all journal entries
        .then(dispatchDeleteStateChangeEvent)  // <-- Broadcast the state change event
}