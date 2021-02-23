import "../reviews/ReviewList.js"

const eventHub = document.querySelector("#container")

export const Product = (product, category) => {
    return `
        <section class="baked_good">
            <header class="baked_good__header">
                <h4>${product.name}</h4>
                <p>$${product.price}</p>
            </header>
            <div>
                <button id="addProduct--${product.id}">Add to Cart</button>
                <p>${product.description} [${category.name}]</p>
                <a href="#"><em id="reviews--${product.id}">Reviews</em></a>
            </div>
            
        </section>
    `
}

// added a --${product.id} to the button id="" because it was already looking for that information. That info is needed to go through all product and find that product to add to cart
eventHub.addEventListener("click", evt => {
    debugger
    if (evt.target.id.startsWith("addProduct--")) {
        const [prefix, productId] = evt.target.id.split("--")
        const addProductEvent = new CustomEvent("addToCart", {
            detail: {
                addedProduct: parseInt(productId)
            }
        })
        eventHub.dispatchEvent(addProductEvent)
    }
})

eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("reviews--")) {
        const [prefix, productId] = event.target.id.split("--")
        const showReviewEvent = new CustomEvent("ReviewsClicked", {
            detail: {
                productId: parseInt(productId)
            }
        })
        eventHub.dispatchEvent(showReviewEvent)
    }
})