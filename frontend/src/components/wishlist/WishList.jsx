import React from 'react';
import { Link } from 'react-router-dom';
import { Close, Favorite, FavoriteBorder, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material';
import WishListSingle from './WishListSingle';
import './WishList.scss';
import { Button } from '@mui/material';


const WishList = ({ setOpenWishList }) => {

  const cartData = [
    {
      id: 1,
      name: 'Product 1',
      image: 'https://picsum.photos/200',
      price: 100,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://picsum.photos/200',
      price: 200,
      quantity: 1,
    },
  ];

  return (
    <div className='cart'>
      <div className="cart-inner">
        <div className="close-button">
          <Close onClick={() => setOpenWishList(false)} />
        </div>
        <div className="cart-header">
          <FavoriteBorder className='cart-icon' />
          <div className="cart-quantity">
            2 Items
          </div>
        </div>
        <div className="cart-body">
          {
            cartData && cartData.map((product, index) => (
              <WishListSingle data={product} key={index} />
            ))
          }
          {/* {
            cartData.map((product) => (
              <div className="cart-product" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt="product" />
                </div>
                <div className="product-info">
                  <h3>
                    {product.name}
                  </h3>
                  <div className="product-price">
                    ₵ {product.price}
                  </div>
                  <div className="product-quantity">
                    <button>
                      -
                    </button>
                    <div className="quantity">
                      {product.quantity}
                    </div>
                    <button>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          } */}
        </div>
      </div>
    </div>
  )
}

export default WishList;