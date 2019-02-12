import gql from 'graphql-tag';

export default gql`
query All_Product {
    Product  {
      id
      Name
      Category
      Price
      Quantity
      Description
      image
    }
  }
  `;