// import our actions
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
  } from '../utils/actions';

  import { reducer } from '../utils/reducers';

  // create a sample of what our global state will look like
    const initialState = {
    products: [],
    categories: [{ name: 'Food' }],
    currentCategory: '1',
  };

//    In our case, we pass in the current state held in initialState and 
//    then our action, indicating that we want to update our products list 
//    with the contents held in the products array. They're just empty 
//    objects for now, but the idea is to see if we are adding anything to 
//    the array and nothing specific. The expect() functions we run afterwards 
//    will help us confirm that we successfully added our products to the 
//    newState and didn't affect initialState in any way, shape, or form.

  test('UPDATE_PRODUCTS', () => {
    let newState = reducer(initialState, {
      type: UPDATE_PRODUCTS,
      products: [{}, {}]
    });
  
    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
  });

  test('UPDATE_CATEGORIES', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CATEGORIES,
      categories: [{}, {}]
    });
  
    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
  });

  test('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: '2'
    });
  
    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
  });