import { Favorite, FavoriteBorder, FavoriteBorderOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductDetailsInfo from './ProductDetailsInfo';

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const totalPrice = data ? count * data.unit_price : data?.unit_price;

  const handleIncrement = () => {
    setCount(count + 1);
  }

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  return (
    <div className='details'>
      {
        data ? (
          <div className='details-container'>
            <div className='details-image'>
              <img src={data.image.url} alt={data.name}
                onClick={() => setSelect(0)}
              />
            </div>
            <div className='details-content'>
              <div className='details-content-header'>
                <h3>{data.name}</h3>
                <p className='details-content-price'>Unit Price: ₵{data.unit_price}</p>
                <h3 className='details-content-price'>Total: ₵{totalPrice}</h3>
              </div>
              <div className='details-content-description'>
                <p>{data.description}</p>
              </div>
              <div className='details-content-footer'>
              <div className='details-content-quantity'>
                <div className='increment-button value-button' onClick={handleIncrement}>
                  <p>+</p>
                </div>
                <div className="value">{count}</div>
                <div className='decrement-button value-button' onClick={handleDecrement}>
                  <p className='decrement-sign'>-</p>
                </div>
                {/* <div className="favourite"
                  onClick={() => setClick(!click)}
                >
                  <FavoriteBorder className={click ? 'favourite-icon' : 'favourite-icon'} />
                </div> */}
                <div className="favourite">
                  {
                    click ? (
                      <Favorite className='favourite-icon' onClick={() => setClick(!click)} />
                    ) : (
                      <FavoriteBorderOutlined className='favourite-icon' onClick={() => setClick(!click)} />
                    )
                  }
                </div>
              </div>
                
                <div className='details-content-buttons'>
                  <Button className='button-cart action-buttons' onClick={() => navigate('/cart')}>Add to Cart</Button>
                  <Button className='button-buy action-buttons' onClick={() => navigate('/checkout')}>Buy Now</Button>
                </div>
              </div>
            </div>
            
          </div>

        ) : (
          <div>Loading...</div>
        )         
      } 
      <ProductDetailsInfo />
    </div>
  )
}

export default ProductDetails;