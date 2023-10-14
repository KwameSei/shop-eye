import React, { useState } from 'react';
import { CloseOutlined, Favorite, FavoriteBorder, Message, Send, ShoppingCartCheckout } from '@mui/icons-material';
import { Button } from '@mui/material';

const ProductDetailsCard = ({ setOpen, product}) => {
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const handleMessageShop = () => {
    console.log('Message the shop');
  }

  const incrementQuantity = () => {
    if (quantity >= 0) {
      setQuantity(quantity + 1);
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const resetQuantity = () => {
    setQuantity(1);
  }

  return (
    <div className='product-details-card'>
      {/* Create the modal */}
      {
        product ? (
          <div className="card-content">
            <div className="card-main">
              <div className="card-items">
                <div className="card-image">
                  <img src={product.image.url} alt={product.name} />
                  <div className="shop-image">
                    {/* <img src={product.shop.image.url} alt={product.shop.name} /> */}
                    <div className="shop-name">
                      <h3>
                        {/* {product.shop.name} */}
                      </h3>
                      <h3 className="shop-rating">
                        {/* {product.shop.rating} Raings */}
                      </h3>
                    </div>
                  </div>
                  <div className="message-button"
                    titleAccess='Message the shop'
                    onClick={handleMessageShop}
                  >
                    <button className="button">
                      Send Message <Message className='button-icon' />
                    </button>
                  </div>
                  <h4>
                  ({product.sold}) Sold Out
                </h4>
                </div>
                
              </div>
              
            </div>
            <div className="right-info">
              <div className="close">
                <CloseOutlined 
                  onClick={() => setOpen(false)}
                  titleAccess='Close'
                  className='close-icon'
                />
              </div>
              <div className="product-title">
                <h2>{product.name}</h2>
              </div>
              <div className="product-price">
                <h2>{`${product.unit_price ? "₵" + product.unit_price : null}`}</h2>
              </div>
              <div className="product-increase">
                <div className="button-group">
                  <button className="button button-left" onClick={incrementQuantity}>+</button>
                  {/* <input className='quantity' type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /> */}
                  <span className='quantity' >
                    {quantity}
                  </span>
                  <button className="button button-right" onClick={decrementQuantity}>-</button>
                  <button className="button button-reset" onClick={resetQuantity}>Reset</button>
                </div>
                <div className='favourite-icon'>
                  { click ? (
                    <Favorite
                      className="favorite"
                      onClick={() => setClick(!click)}
                      titleAccess='Remove from wishlist'
                    />
                    ) : (
                    <FavoriteBorder
                      className="favorite"
                      onClick={() => setClick(!click)}
                      titleAccess='Add to wishlist'
                    />
                  )}
                </div>
                   <Button 
                    variant="contained"
                    className="button"
                    onClick={() => setSelect(true)}
                  >
                    Add to Cart <ShoppingCartCheckout className='button-icon' />
                  </Button>
                {/*
                  <div className="select">
                    <select name="select" id="select">
                      <option value="1">1</option>
                    </select>

                    <Button
                      variant="contained"
                      className="button"
                      onClick={() => setClick(true)}
                    >
                      Buy Now
                    </Button>
                    <div className="click">
                      <button className="button" onClick={() => setClick(false)}>Cancel</button>
                      <button className="button" onClick={() => setClick(false)}>Buy Now</button>
                    </div>
                    </div>
                </div>*/}
              </div> 
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

export default ProductDetailsCard;