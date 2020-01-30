import { observable } from 'mobx';

const productSymbol = Symbol('product');

class ProductModel {
  [productSymbol];

  constructor(product) {
    if (!product || typeof product !== 'object') {
      throw new Error('Provided product is invalid');
    }

    this[productSymbol] = observable(product)
  }

  get id() {
    return this[productSymbol].code;
  }

  get name() {
    return this[productSymbol].productName;
  }

  get price() {
    return this[productSymbol].retailPrice;
  }

  get link() {
    return this[productSymbol].pdpURL;
  }

  // Should be computed
  get thumbnailSrc() {
    const { mobileImageURLs } = this[productSymbol];

    if (Array.isArray(mobileImageURLs) && mobileImageURLs.length) {
      return mobileImageURLs[0];
    }

    return 'https://via.placeholder.com/150x200';
  }
}

export default ProductModel;
