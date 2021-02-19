let rating = []

export const getRatings = () => {
    return fetch("http://localhost:8088/ratings")
        .then(response => response.json())
        .then(parsedRatings => {
            rating = parsedRatings
            console.log(getRatings)
        })
}

export const useRatings = () => {
    return rating.slice()
}
