import React, { useCallback, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const maxHeight = 200;

const useStyles = makeStyles(
  {
    imgWrapper: {
      textAlign: 'center',
      position: 'relative',

      '& img': {
        maxWidth: '100%',
        maxHeight,
        transition: 'opacity .2s',
      },

      '&$loading': {
        height: maxHeight,

        '& img': {
          opacity: 0,
        },

        '& $loader': {
          opacity: 1,
        }
      }
    },
    loading: {},
    loader: {
      position: 'absolute',
      opacity: 0,
      pointerEvents: 'none',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  }
);

const ProductImg = (props) => {
  const [loading, setLoading] = useState(true);
  const { imgWrapper, loading: loadingCss, loader: loaderCss } = useStyles();
  const onLoad = useCallback(
    () => {
      setLoading(false);
    },
    [setLoading],
  );

  return (
    <div className={clsx(imgWrapper, { [loadingCss]: loading })}>
      <Box className={loaderCss} display="flex" alignItems="center" justifyContent="center">
        <CircularProgress disableShrink />
      </Box>
      <img
        alt=""
        {...props}
        onLoad={onLoad}
      />
    </div>
  );
};

export default ProductImg;
