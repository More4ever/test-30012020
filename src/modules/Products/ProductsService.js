import BaseAxiosInstance from '../../libs/axios/BaseAxiosInstance';

const ProductsService = {
  getList() {
    return BaseAxiosInstance
      .get('https://raw.githubusercontent.com/traa/apiplp/master/db.json')
      .then(
        (
          {
            data: {
              pageItems
            },
          },
        ) => (
          pageItems
        ),
      )
  },
};

export default ProductsService;
