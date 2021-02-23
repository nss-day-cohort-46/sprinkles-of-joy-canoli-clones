import { bakeryAPI } from "../Settings.js"

let rating = []

// creating a fetch call to get the rating array from the api
export const getRatings = () => {
    return fetch(`${bakeryAPI.baseURL}/ratings`)
        .then(response => response.json())
        .then(parsedRatings => {
            rating = parsedRatings
        })
}

export const useRatings = () => {
    return rating.slice()
}