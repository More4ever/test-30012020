import { observable, action } from 'mobx';
import ProductModel from './ProductModel';
import ProductsService from '../ProductsService';

const productsSymbol = Symbol('products');
const loadingSymbol = Symbol('loading');

class ProductsCollection {
  [productsSymbol] = observable([]);
  [loadingSymbol] = observable.box(false);

  get products() {
    return this[productsSymbol];
  }

  get loading() {
    return this[loadingSymbol].get()
  }

  // Should be computed
  get isEmpty() {
    return !this[productsSymbol].length;
  }

  // Should be computed
  get length() {
    return this[productsSymbol].length;
  }

  async loadProducts() {
    this[loadingSymbol].set(true);
    try {
      this.setProducts(await ProductsService.getList());
    } catch (e) {
      throw e;
    } finally {
      this[loadingSymbol].set(false);
    }
  }

  setProducts = action(
    (products) => {

      if (!products || !Array.isArray(products)) {
        throw new Error('Provided products are not an array');
      }

      this[productsSymbol] = products.map((product) => new ProductModel(product));
    }
  );

  addProduct = action(
    (product) => {
      this[productsSymbol].push(new ProductModel(product));
    }
  );
}

export default new ProductsCollection();
