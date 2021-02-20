const eventHub = document.querySelector("#container")

import { getReviews, useReviews } from "./ReviewDataProvider.js"
import { ReviewEntryComponent } from "./ReviewEntry.js"

const reviewLog = document.querySelector(".customerSection")
// come back here and rename this variable also find out where you want to render the variables

const render = (reviewArray) => {
    const reviewsConvertedToString = reviewArray.map(reviewObj => {
        return ReviewEntryComponent(reviewObj)
    }).join("")

    reviewLog.innerHTML += `
    <div class="savedReviewContainer">${reviewsConvertedToString}</div>
    `
}
export const ReviewList = () => {
    getReviews()
        .then(() => {
            const allReviews = useReviews()
            render(allReviews)
        })
}


// eventHub.addEventListener("journalStateChanged", event => {
//     entryList()
// })

// look back at Daily Journal entry list to help comment out what code does