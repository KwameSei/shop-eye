import React, { useState } from 'react';

import './WishList.scss';
import { Close, ShoppingBagOutlined, ShoppingCartCheckout } from '@mui/icons-material';

const WishListSingle = ({data}) => {
  const [value, setValue] = useState(1);
  
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
    console.log('Remove product from cart');
    data.quantity = 0;
  }

  return (
    <div className="cart-product">
      <div className="cart-product-inner">
        <div className="remove-button">
          <Close onClick={handleRemove} />
        </div>
        <div className="product-image">
          <img src={data.image} alt="product" />
        </div>
        <div className="product-info">
          <h3>
            {data.name}
          </h3>
          <div className="product-total-price">
            ₵ {totalPrice}
          </div>
        </div>
          <ShoppingCartCheckout className='cart-icon' />
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

export default WishListSingle;