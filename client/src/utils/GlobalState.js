// createContext will be used to instantiate a new Context object. The more meaningful term we can use here is 
// that we're using it to create the container to hold our global state data and functionality so we can provide 
// it throughout our app!

// useContext is another React Hook that will allow us to use the state created from the createContext function.
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

// After that code is in place, add the following code below it to actually instantiate the global state object:
const StoreContext = createContext();
// Provider and Consumer. The Provider is a special type of React component that we wrap our application in so 
// it can make the state data that's passed into it as a prop available to all other components. The Consumer 
// is our means of grabbing and using the data that the Provider holds for us.
const { Provider } = StoreContext;

//With this function, StoreProvider, we instantiate our initial global state with the useProductReducer() 
// function we created earlier. Because that wraps it around the useReducer() Hook from React, every time we 
// run this useProductReducer() function, we receive the following two items in return:
// state is the most up-to-date version of our global state object.

// dispatch is the method we execute to update our state. It is specifically going to look for an action object passed in as its argument, as we'll soon see.
const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
      products: [],
      cart: [],
      cartOpen: false,
      categories: [],
      currentCategory: ''
    });
    // use this to confirm it works!
    console.log(state);
    //we then return the StoreContext's <Provider> component with our state object and dispatch the function provided as data for the value prop.
    return <Provider value={[state, dispatch]} {...props} />;
  };

// We just created our own custom React Hook! When we execute this function from within a component, we will receive the [state, dispatch] 
// data our StoreProvider provider manages for us. This means that any component that has access to our StoreProvider component can use any 
// data in our global state container or update it using the dispatch function.
  const useStoreContext = () => {
    return useContext(StoreContext);
  };



  export { StoreProvider, useStoreContext };