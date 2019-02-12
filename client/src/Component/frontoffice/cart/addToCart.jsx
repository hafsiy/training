import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { PropTypes } from 'prop-types';
import { Button} from '@material-ui/core/Button';

const MAX_QTE_STOCK = 100;
class AddToCartButton extends Component {
  addToList = (product) => {
    this.props.mutate({
      variables: { product },
    });
  }

  // CheckButton = (Quantity) => (Quantity < MAX_QTE_STOCK);

  render() {
    return (
      <Button
        disabled={this.CheckButton(this.props.data.Quantity)}
        color="blue"
        floated="right"
        animated="vertical"
        onClick={() => this.addToList(this.props.data)}
      >
        <Button.Content hidden>Buy</Button.Content>
        <Button.Content visible>
          {/* <Icon name="shop" /> */}
        </Button.Content>
      </Button>
    );
  }
}
const addToBasket = gql`
  mutation addProduct($input: ProductInput) {
    addProduct(input: $input) {
      id
    }
  }
`;

AddToCartButton.propTypes = {
  mutate: PropTypes.func.isRequired,
  data: PropTypes.object,
};


export default graphql(addToBasket)(AddToCartButton);
