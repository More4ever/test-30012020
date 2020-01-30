import React, { PureComponent } from 'react';
import { observer } from 'mobx-react'
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import ProductCard from './components/ProductCard';
import { TextField } from '@material-ui/core';


const initialState = {
  page: 0,
  perPage: 10,
  error: null,
  search: '',
};

class ProductsListing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidMount() {
    const { productsStore } = this.props;
    (async () => {
      try {
        await productsStore.loadProducts();
      } catch (error) {
        this.setState({ error: error.message });
      }
    })()
  }

  clearError = () => {
    this.setState({ error: initialState.error });
  };

  onPageChange = (event, nextPage) => {
    this.setPage(nextPage);
  };

  setPage(page) {
    this.setState(
      { page, },
      () => {
        window.scrollTo(0, 0);
      },
    );
  }

  onSearchChange = ({ target: { value } }) => {
    this.setPage(initialState.page);
    this.setState(
      { search: value },
    );
  };
  // TODO: should be mobx computed
  getFilteredProducts() {
    const { search } = this.state;
    const { productsStore } = this.props;

    if (!search || productsStore.isEmpty) {
      return productsStore.products;
    }

    return productsStore.products
      .filter(
        (product) => product.name.toLowerCase().includes(search.toLowerCase())
      )
  }

  getProductsForPage(productsForSlice) {
    const { page, perPage } = this.state;

    const start = page * perPage;
    const end = start + perPage;

    return productsForSlice.slice(start, end);
  }

  render() {
    const { page, perPage, error, search } = this.state;
    const { productsStore } = this.props;

    const filteredProducts = this.getFilteredProducts();

    if (productsStore.loading) {
      return (
        <Box px={3} py={6} textAlign="center">
          <CircularProgress disableShrink />
        </Box>
      );
    }

    const hasItems = Boolean(filteredProducts.length);

    return (
      <>
        <Box pb={2}>
          <TextField value={search} onChange={this.onSearchChange} placeholder="Search for product" />
        </Box>
        {(!hasItems && search) && (
          <Box p={2} textAlign="center">
            Any products for search request
          </Box>
        )}
        {
          hasItems && (
            <>
              <Grid container spacing={2} justify="center">
                {
                  this.getProductsForPage(filteredProducts)
                    .map(
                      (
                        product
                      ) => (
                        <Grid item key={product.id}>
                          <ProductCard product={product} />
                        </Grid>
                      )
                    )
                }
              </Grid>
              <TablePagination
                component="nav"
                page={page}
                rowsPerPage={perPage}
                count={filteredProducts.length}
                onChangePage={this.onPageChange}
                labelRowsPerPage={null}
                rowsPerPageOptions={[]} // Hide items per page select
              />
            </>
          )
        }
        <Snackbar
          open={Boolean(error)}
          onClose={this.clearError}
          message={error}
        />
      </>
    );
  }
}

export default observer(ProductsListing)
