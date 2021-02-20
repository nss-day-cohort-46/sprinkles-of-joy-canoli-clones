export const ReviewEntryComponent = (review) => {
    return ` 
        <section id="review--${review.id}" class="reviewEntry">
            <div class="reviewReview">Review: ${review.review}</div>
            <div class="reviewRating">Rating: ${review.rating.label}</div>
        </section>
    `
}