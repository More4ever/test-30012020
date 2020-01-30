import React, { Component } from 'react';
import { render } from 'react-dom';
import ProductsListing from './modules/Products/ProductsListing/ProductsListing';
import ProductsCollection from './modules/Products/store/ProductsCollection';


class App extends Component {
  render() {
    return (
      <div>
        <ProductsListing productsStore={ProductsCollection} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
