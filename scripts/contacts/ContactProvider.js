import { bakeryAPI } from "../Settings.js"

// saves contact info to api
export const submitContactMessage = contact => {
    return fetch(`${bakeryAPI.baseURL}/contactMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
    })
}