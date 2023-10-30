import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                <h3 className='details-content-header-price'>Unit Price: ₵{data.unit_price}</h3>
                <h3 className='details-content-header-price'>Total: ₵{totalPrice}</h3>
              </div>
              <div className='details-content-description'>
                <p>{data.description}</p>
              </div>
              <div className='details-content-footer'>
                <div className='details-content-footer-quantity'>
                  <button className='details-content-increment' onClick={handleIncrement}>+</button>
                  <div className="value">{count}</div>
                  <button className='details-content-decrement' onClick={handleDecrement}>-</button>
                </div>
                <div className='details-content-footer-button'>
                  <button className='details-content-footer-button-cart' onClick={() => navigate('/cart')}>Add to Cart</button>
                  <button className='details-content-footer-button-buy' onClick={() => navigate('/checkout')}>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )
      }
    </div>
  )
}

export default ProductDetails;