export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

// IndexedDB is asynchronous and event driven. This means that if we want it to be on and 
// listening all the time, we'll have to write a lot of what-if type functionality to handle all of the moving parts.

// To make this easier, we'll use a Promise. A Promise is an object that represents the eventual
// completion (or failure) of an asynchronous operation and its resulting value. In other words,
// it's a way to handle asynchronous operations without using callbacks. We'll use a Promise to
// handle the asynchronous nature of IndexedDB.

// So when we call the function, we'll open the connection to the database and then connect to 
// the object store that we pass in as storeName. Then we'll perform a transaction, using the 
// method and object values to help carry it out. We also wrap the whole thing in a Promise, 
// making it a lot easier to work with IndexedDB's asynchronous nature.
// This line declares an exportable function named idbPromise that takes three parameters: storeName, method, and object. These parameters likely determine which IndexedDB store to interact with, what operation to perform, and the data to be used in that operation.
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to the database `shop-shop` with the version of 1
    const request = window.indexedDB.open('shop-shop', 1);

    // create variables to hold reference to the database, transaction (tx), and object store
    let db, tx, store;

    // if version has changed (or if this is the first time using the database), run this method and create the three object stores 
    request.onupgradeneeded = function(e) {
      const db = request.result;
      // create object store for each type of data and set "primary" key index to be the `_id` of the data
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    // handle any errors with connecting
    request.onerror = function(e) {
      console.log('There was an error');
    };

    // on database open success
request.onsuccess = function(e) {
  // save a reference of the database to the `db` variable
  db = request.result;
  // open a transaction do whatever we pass into `storeName` (must match one of the object store names)
  tx = db.transaction(storeName, 'readwrite');
  // save a reference to that object store
  store = tx.objectStore(storeName);

  // if there's any errors, let us know
  db.onerror = function(e) {
    console.log('error', e);
  };

  // Here we use a switch statement to check what the value of the method is.
  switch (method) {

    // If it's put, then we run the .put() method on the object store, 
    // overwriting any data with the matching _id value from the object and 
    // adding it if it can't find a match. If it's get, we'll simply get all 
    // data from that store and return it. Both the put and get methods will 
    // return the data to wherever we call this idbPromise() function.
    case 'put':
      store.put(object);
      resolve(object);
      break;
    case 'get':
      const all = store.getAll();
      all.onsuccess = function() {
        resolve(all.result);
      };
      break;
      // If the value is delete, we'll delete that item from the object store. This option will come in handy if users want to remove an item from the shopping cart while offline.
    case 'delete':
      store.delete(object._id);
      break;
    default:
      console.log('No valid method');
      break;
  }
  // when the transaction is complete, close the connection
  tx.oncomplete = function() {
    db.close();
  };
}

  });
}