import React, { useEffect } from "react";
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
import { idbPromise } from "../../utils/helpers";
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";

const Cart = () => {
    const [state, dispatch] = useStoreContext();

    //  function to check if there's anything in the state's cart property on load. If not, we'll retrieve data from the IndexedDB cart object store.
    useEffect(() => {
        async function getCart() {
          const cart = await idbPromise('cart', 'get');
          dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        };
      
        if (!state.cart.length) {
          getCart();
        }
        // We list all of the data that this useEffect() Hook is dependent on to execute. In this case, it's just the cart property of the state object.
      }, [state.cart.length, dispatch]);


        function toggleCart() {
        dispatch({ type: TOGGLE_CART });
        }
        function calculateTotal() {
            let sum = 0;
            state.cart.forEach(item => {
              sum += item.price * item.purchaseQuantity;
            });
            return sum.toFixed(2);
          }

        if (!state.cartOpen) {
            return (
              <div className="cart-closed" onClick={toggleCart}>
                {/* You should always wrap emojis (like the shopping cart icon) in a <span> element that includes role and aria-label attributes. Doing so will help screen readers understand the context of the emoji. */}
                <span
                  role="img"
                  aria-label="trash">🛒</span>
              </div>
            );
          }
  return (
    <div className="cart">
  <div className="close" onClick={toggleCart}>[close]</div>
  <h2>Shopping Cart</h2>
  {state.cart.length ? (
    <div>
      {state.cart.map(item => (
        <CartItem key={item._id} item={item} />
      ))}
      <div className="flex-row space-between">
        <strong>Total: ${calculateTotal()}</strong>
        {
          Auth.loggedIn() ?
            <button>
              Checkout
            </button>
            :
            <span>(log in to check out)</span>
        }
      </div>
    </div>
  ) : (
    <h3>
      <span role="img" aria-label="shocked">
        😱
      </span>
      You haven't added anything to your cart yet!
    </h3>
  )}
</div>
  );
};

export default Cart;