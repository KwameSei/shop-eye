import React from 'react';
import { CountDown } from '../index';

const ProductEventCard = () => {
  return (
    <div className='e-card'>
      <div className="event-content">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_JBCdOFlK_FIpXbdcqEiiVkNwTqtmUe9Z0w&usqp=CAU" alt="event image" />
      </div>
      <div className="event-info">
        <h2 className="product-title">
          Apple New Product Launch
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et tempore, corporis odit sunt optio ipsam, incidunt nisi earum est modi perspiciatis alias deleniti consectetur, quos officia temporibus commodi sed deserunt?

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et tempore, corporis odit sunt optio ipsam, incidunt nisi earum est modi perspiciatis alias deleniti consectetur, quos officia temporibus commodi sed deserunt?
        </p>
        <div className="product-price">
          <div className="product-price-detail">
            <div className='discount-price'>
              ₵2000
            </div>
            <div className='original-price'>
              ₵1500
            </div>
          </div>
          <div className="sold-out">
            250 Sold
          </div>
        </div>
        <div className="count-down">
          <CountDown />
        </div>
      </div>
    </div>
  )
}

export default ProductEventCard;