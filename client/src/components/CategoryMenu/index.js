import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;
  
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
//Now when this component loads and the response from the useQuery() Hook returns, the useEffect() Hook notices that categoryData is not undefined anymore 
// and runs the dispatch() function, setting our category data to the global state!

// Remember how the useEffect() Hook works. It is a function that takes two arguments, a function to run given a certain condition,
//  and then the condition. In this case, the function runs immediately on load and passes in our function to update the global state a
//  nd then the data that we're dependent on, categoryData and dispatch. Now, categoryData is going to be undefined on load because the 
//  useQuery() Hook isn't done with its request just yet, meaning that if statement will not run.

// But the beauty of the useEffect() Hook is that it not only runs on component load, but also when some form of state changes in that 
// component. So when useQuery() finishes, and we have data in categoryData, the useEffect() Hook runs again and notices that categoryData 
// exists! Because of that, it does its job and executes the dispatch() function.
useEffect(() => {
  if (categoryData) {
    dispatch({
      type: UPDATE_CATEGORIES,
      categories: categoryData.categories
    });
    categoryData.categories.forEach(category => {
      idbPromise('categories', 'put', category);
    });
  } else if (!loading) {
    idbPromise('categories', 'get').then(categories => {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categories
      });
    });
  }
}, [categoryData, loading, dispatch]);


const handleClick = id => {
  dispatch({
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: id
  });
};

return (
  <div>
    <h2>Choose a Category:</h2>
    {categories.map(item => (
      <button
        key={item._id}
        onClick={() => {
          handleClick(item._id);
        }}
      >
        {item.name}
      </button>
    ))}
  </div>
);
}

export default CategoryMenu;
