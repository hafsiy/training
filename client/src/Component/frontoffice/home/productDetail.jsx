import React from 'react';
import { Grid, CardMedia} from '@material-ui/core';
import { Query } from 'react-apollo';
import All_Product from '../../graphql/queries/all_product';


const DetailsProduct = ({
  match, 
}) => (
  <Query query={All_Product} variables={{ id: match.params.id }}>
    {({ data, loading }) => {
      if (loading) return <h1> Chargement... </h1>;
        const {Product} = data;
        console.log(Product) ;       
        return (
    
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <CardMedia
               
                image={Product.image}
                title={Product.Name}
              />
            </Grid>
            <Grid item xs={6} >
              <h2 >{Product.Name}</h2>
              <h2 >{Product.Category}</h2>
              <p >{Product.Description}</p>
              <strong >
                Prix:
                <span >{` ${Product.Price} DT`}</span>
              </strong>
              <strong >
                Disponibilté :
                <span >{Product.Quantity > 0 ? ' En stock' : '' }</span>
              </strong>
            </Grid>
          </Grid>
       
        );
      
    
    }}
  </Query>
);

export default DetailsProduct;

