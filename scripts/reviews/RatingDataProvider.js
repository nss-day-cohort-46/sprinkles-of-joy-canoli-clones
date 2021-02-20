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