import React, { useState } from 'react'

import './DisplayProducts.scss';

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="product-info">
      <div className="product-info-inner">
        <div className="info-items">
          <h5
            className={`items ${active === 1 ? 'active' : ''}`}
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 && (
            <div className="info-content">
              {/* <p>{data.description}</p> */}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti quaerat quis perferendis est veniam qui doloremque voluptate provident! Maiores animi temporibus esse dicta at nisi labore quidem deserunt consectetur ipsam.
            </div>
          )}
        </div>
        <div className="info-items">
          <h5
            className={`items ${active === 2 ? 'active' : ''}`}
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 && (
            <div className="info-content">
              {/* <p>{data.reviews}</p> */}
            </div>
          )}
        </div>
        <div className="info-items">
          <h5
            className={`items ${active === 3 ? 'active' : ''}`}
            onClick={() => setActive(3)}
          >
            Seller Info
          </h5>
          {active === 3 && (
            <div className="info-content">
              {/* <p>{data.additionalInfo}</p> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsInfo;