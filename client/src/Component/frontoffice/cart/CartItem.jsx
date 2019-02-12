import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ Name, Price, Quantity, onClick }) => {
    return (
        <div className="cart-item">
            <div>
                <button className="btn btn-danger btn-xs" onClick={onClick}>X</button>
                <span className="cart-item__name">{Name}</span>
            </div>
            <div className="cart-item__price">{Price} {Quantity}</div>
        </div>
    );
}

CartItem.propTypes = {
    Name: PropTypes.string.isRequired,
    Price: PropTypes.number.isRequired,
    Quantity: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default CartItem;
