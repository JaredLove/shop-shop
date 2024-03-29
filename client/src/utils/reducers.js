import { useReducer } from 'react';

// import actions from './actions';
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
  } from './actions';
  

  export const reducer = (state, action) => {
    switch (action.type) {
      // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
      case UPDATE_PRODUCTS:
        return {
          ...state,
          products: [...action.products]
        };
      // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case UPDATE_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories]
        };

    case UPDATE_CURRENT_CATEGORY:
        return {
            ...state,
            currentCategory: action.currentCategory
        };

    case ADD_TO_CART:
        return {
            ...state, // Copy the current state
            cartOpen: true, // Update the cartOpen property in the state
             cart: [...state.cart, action.product] // Update the cart array by adding a new product to the array
        };

    case ADD_MULTIPLE_TO_CART:
        return {
            ...state,
            cart: [...state.cart, ...action.products],
        };

    case REMOVE_FROM_CART:
        let newState = state.cart.filter(product => {
            return product._id !== action._id;
        });

        return {
            ...state,
            cartOpen: newState.length > 0,
            cart: newState
        };
        // The original state should be treated as immutable.
    case UPDATE_CART_QUANTITY:
        return {
            ...state,
            cartOpen: true,
            cart: state.cart.map(product => {
            if (action._id === product._id) {
                product.purchaseQuantity = action.purchaseQuantity;
            }
            return product;
            })
        };

    case CLEAR_CART:
        return {
            ...state,
            cartOpen: false,
            cart: []
        };

    case TOGGLE_CART:
        return {
            ...state,
            cartOpen: !state.cartOpen
        };


  
      default:
        return state;
    }
  };


    // This function, useProductReducer(), will be used to help 
    // initialize our global state object and then provide us with 
    // the functionality for updating that state by automatically 
    // running it through our custom reducer() function. Think of 
    // this as a more in-depth way of using the useState() Hook 
    // we've used so much.

  export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
  }