import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import All_Product from '../../graphql/queries/all_product';
import ProductList from './Product';

class Product extends Component {
 
  render(){
    return(
      <div>
    <Query query={All_Product}>
      {({ loading, data }) => {
        if (loading) return <h1> Chargement... </h1>;
        return (
          <Grid container spacing={24}>
            {
              data.Product.map((product) => (
                <Grid key={product.id} item xs={12} sm={3}>
                  <ProductList product={product} />
                </Grid>
              ))
            }
          </Grid>
        );
      }
      }
    </Query>
  </div>
  
    );
  }
  
};
  


export default withStyles()(Product);
