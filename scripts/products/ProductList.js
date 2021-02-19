import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")

let bakeryProducts = []
let bakeryCategories = []

export const ProductList = () => {
  // debugger
  getProducts()
    .then(getCategories)
    .then(() => {
      bakeryProducts = useProducts()
      bakeryCategories = useCategories()
      render()
    })
}

const render = () => {
  contentTarget.innerHTML = bakeryProducts.map(product => {
    //changed cat.id to category.id
    const productCategory = bakeryCategories.find(category => category.id === product.categoryId)

    return Product(product, productCategory)
  }).join("")
}

//added event listener to filter through category items in dropdown 
eventHub.addEventListener("categorySelected", event => {
//gets the selected category id from dropdown
  const catId = event.detail.selectedCategory
//checks to see if the user is sorting by ALL categories or a SPECIFIC category
  if(catId !== "0"){
bakeryProducts = useProducts().filter(product => product.categoryId === parseInt(catId))
    render()
  } else {
    //doing the same thing as line 17.
    bakeryProducts = useProducts()
    render()
  }
})

