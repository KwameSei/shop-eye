import React, { useState } from 'react';

import './Cart.scss';
import { Close } from '@mui/icons-material';

const CartSingle = ({data}) => {
  const [value, setValue] = useState(1);
  const [removeProduct, setRemoveProduct] = useState(false);
  
  const totalPrice = data.price * value;

  const handleIncrement = () => {
    setValue(value + 1);
  }

  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  }

  // Remove product from cart
  const handleRemove = () => {
    setRemoveProduct(true);
  }

  return (
    <div className="cart-product">
      <div className="cart-product-inner">
        <div className='item-buttons'>
          <div className="items"
            onClick={handleIncrement}
          >
            <p className='sign'>+</p>
          </div>
          <div className="quantity-display">
            {value}
          </div>
          <div className="items"
            onClick={handleDecrement}
          >
            <p className='sign dec-sign'>-</p>
          </div>
        </div>
        <div className="product-image">
          <img src={data.image} alt="product" />
        </div>
        <div className="product-info">
          <h3>
            {data.name}
          </h3>
          <div className="product-price">
            ₵ {data.price}
          </div>
          <div className="product-total-price">
            ₵ {totalPrice}
          </div>
        </div>
        <div className="remove-button">
          <Close onClick={handleRemove} />
        </div>
      </div>
      {/* <div className="product-image">
        <img src={data.image} alt="product" />
      </div>
      <div className="product-info">
        <h3>
          {data.name}
        </h3>
        <div className="product-price">
          ₵ {data.price}
        </div>
        <div className="product-quantity">
          <button onClick={handleDecrement}>
            -
          </button>
          <div className="quantity">
            {value}
          </div>
          <button onClick={handleIncrement}>
            +
          </button>
        </div>
        <div className="product-total-price">
          ₵ {totalPrice}
        </div>
      </div> */}
    </div>
  )
}

export default CartSingle;