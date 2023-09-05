// UPDATE_PRODUCTS is used by the ProductList component. Right now, we're getting all 
// of our product data from the server, and Apollo caches the results. This is great for 
// performance, but it also means we have to go through Apollo every time we want to 
// update that list. The end goal here is to store the data retrieved for products by 
// Apollo in this global state. This way, we can add offline capabilities later and 
// persist our product data!
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";

// UPDATE_CATEGORIES works a lot like UPDATE_PRODUCTS in that we want to take the 
// list of categories retrieved from the server by Apollo and store it in this global 
// state. Again, this will allow us to easily add offline capabilities at a future 
// point in this project.
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";

// UPDATE_CURRENT_CATEGORY is sort of the connecting piece of data for the previous 
// two actions we created, in that we want to be able to select a category from the 
// state created by the UPDATE_CATEGORIES action and display products for that 
// category from the list we create from the UPDATE_PRODUCTS action.
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";

// ADD_TO_CART and ADD_MULTIPLE_TO_CART are used by the Cart component. We'll
//  use the ADD_TO_CART action when we want to add a single item to the cart,
//   and we'll use the ADD_MULTIPLE_TO_CART action when we want to add multiple
//    items to the cart.
export const ADD_TO_CART = 'ADD_TO_CART';
// ADD_MULTIPLE_TO_CART is used by the Cart component to add multiple items to the cart.
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
// REMOVE_FROM_CART is used by the Cart component to remove items from the cart.
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
// UPDATE_CART_QUANTITY is used by the Cart component to update the quantity of an item in the cart.
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
// CLEAR_CART is used by the Cart component to empty the cart of all items.
export const CLEAR_CART = 'CLEAR_CART';
// TOGGLE_CART is used by the Cart component to control when the cart is visible or hidden.
export const TOGGLE_CART = 'TOGGLE_CART';