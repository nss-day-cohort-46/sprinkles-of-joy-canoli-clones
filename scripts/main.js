console.log("Welcome to Sprinkles of Joy!")

import "./customers/RegisterForm.js"
import "./orders/OpenCart.js"
import "./orders/OrderList.js"
import { CustomerNav } from "./customers/CustomerNav.js"
import { CategorySelect } from "./categories/CategorySelect.js"
import { LoginForm } from "./customers/LoginForm.js"
import { ProductList } from "./products/ProductList.js"
import { getRatings, useRatings } from "./reviews/RatingDataProvider.js"
//adding orderhistorybutton
import "./orders/OrderHistoryLink.js"
// import { getOrders } from "./orders/OrderProvider.js"
LoginForm()
CustomerNav()
CategorySelect()
ProductList()
// getOrders() 
useRatings()
getRatings()
// showPastOrders()