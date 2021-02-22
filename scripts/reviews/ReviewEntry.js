export const ReviewEntryComponent = (review) => {
    return ` 
        <section id="review--${review.id}" class="reviewEntry">
            <div class="reviewText">Review: ${review.review}</div>
            <div class="reviewRating">${review.rating.label}</div>
        </section>
    `
}