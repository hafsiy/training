import React from "react";
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './ProductStyle';


  const ProductList = ({ classes, product }) => (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.image}
          title={product.Name}
        >
        </CardMedia>
      </CardActionArea>
      <CardContent className={classes.info}>
        <Typography gutterBottom variant="h5" component="h2">
          { product.Name }
        </Typography>
        <Typography component="small">
          { `${product.Price} dt` }
        </Typography>
        <Typography component="small">
          {product.Description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <Link to={`/product/${product.id}`}>Détails</Link>
        </Button>
        {/* <Button
            className={isInCart ? 'btn btn-danger' : 'btn btn-primary'}
            onClick={this.handleClick}
              >
          {isInCart ? 'Remove' : 'Add to cart'}
        </Button> */}
      </CardActions>
    </Card>
  );
export default  withStyles(styles)(ProductList) ;