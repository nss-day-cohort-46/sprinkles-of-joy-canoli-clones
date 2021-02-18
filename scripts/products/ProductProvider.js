import { bakeryAPI } from "../Settings.js"

let products = []

export const useProducts = () => products.slice()

export const getProducts = () => {
  //added a return. error went away.
  return fetch(`${bakeryAPI.baseURL}/products`)
    .then(response => response.json())
    .then(bakedGoods => {
      products = bakedGoods
    })
}
