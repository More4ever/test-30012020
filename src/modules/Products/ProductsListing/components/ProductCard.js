import React, {} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import { Card } from '@material-ui/core';
import { observer } from 'mobx-react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ProductImg from './ProductImg';


const useStyles = makeStyles(
  {
    root: {
      width: 200,
    },
  }
);

const ProductCard = (
  { product }
) => {
  const { root } = useStyles();

  return (
    <Card className={root}>
      <CardContent>
        <ProductImg
          src={product.thumbnailSrc}
          alt={product.name}
        />
        <Link href={product.link} target="_blank">
          {product.name}
        </Link>
        <div>
          {product.price}
        </div>
      </CardContent>
    </Card>
  );
};

export default observer(ProductCard);
