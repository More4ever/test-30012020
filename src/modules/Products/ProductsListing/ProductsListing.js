import React, { PureComponent } from 'react';
import { observer } from 'mobx-react'
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';

import ProductCard from './components/ProductCard';


const initialState = {
  page: 0,
  perPage: 10,
  error: null,
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
    this.setState(
      { page: nextPage },
      () => {
        window.scrollTo(0, 0);
      },
    );
  };

  getProductsForPage() {
    const { page, perPage } = this.state;
    const { productsStore } = this.props;

    const start = page * perPage;
    const end = start + perPage;

    return productsStore.products.slice(start, end);
  }

  render() {
    const { page, perPage, error } = this.state;
    const { productsStore } = this.props;

    if (productsStore.loading) {
      return (
        <Box px={3} py={6} textAlign="center">
          <CircularProgress disableShrink />
        </Box>
      );
    }

    return (
      <>
        <Snackbar
          open={Boolean(error)}
          onClose={this.clearError}
          message={error}
        />
        {
          !productsStore.isEmpty && (
            <>
              <Grid container spacing={2} justify="center">
                {
                  this.getProductsForPage()
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
                count={productsStore.length}
                onChangePage={this.onPageChange}
                labelRowsPerPage={null}
                rowsPerPageOptions={[]} // Hide items per page select
              />
            </>
          )
        }
      </>
    );
  }
}

export default observer(ProductsListing)
