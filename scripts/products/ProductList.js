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

//added event listener to filter through category items in dropdown 
eventHub.addEventListener("categorySelected", event => {
  const catId = event.detail.selectedCategory
  if(catId !== "0"){
bakeryProducts = useProducts().filter(product => product.categoryId === parseInt(catId))

    render()
  } else {
    bakeryProducts = useProducts()
    render()
  }
})

const render = () => {
  contentTarget.innerHTML = bakeryProducts.map(product => {
    //changed cat.id to category.id
    const productCategory = bakeryCategories.find(category => category.id === product.categoryId)

    return Product(product, productCategory)
  }).join("")
}
