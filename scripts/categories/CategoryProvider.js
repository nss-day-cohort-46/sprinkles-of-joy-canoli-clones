import { bakeryAPI } from "../Settings.js"

let categories = []

export const useCategories = () => {
  return categories.slice()
  
}

export const getCategories = () => {
  //added return to fetch
  return fetch(`${bakeryAPI.baseURL}/categories`)
    .then(response => response.json())
    .then(categoriesArray => {
      categories = categoriesArray
      // console.log(categoriesArray)
    })
}
