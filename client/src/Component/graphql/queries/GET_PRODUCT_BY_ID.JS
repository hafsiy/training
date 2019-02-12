import gql from 'graphql-tag';

    export default gql`
    query ProductById($id: ID!) {
        ProductById (id: $id){
            Name
            Category
            Price
            Quantity
            Description
            image
        }
    }
      `;

  