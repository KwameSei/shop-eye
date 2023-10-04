import React, { useState } from 'react';
import './Products.scss';
import { Link } from 'react-router-dom';
import { Star, Visibility } from '@mui/icons-material';

const ProductCard = ({ product }) => {
  const [click, setClick] = useState(false);
  // const { name, image, unit_price } = product
  const [open, setOpen] = useState(false);

  const d = product.name; // Get the product name
  const product_name = d.replace(/\s+/g, '-').toLowerCase(); // Replace spaces with dashes and convert to lowercase
  return (
    <>
      <div className='product-card'>
        <div className="product-content">
          <Link to={`/product/${product_name}`} className='link'>
            {/* <div className="product-image"> */}
              <img src={product.image.url} alt={product.name} className='image' />
            {/* </div> */}
          </Link>
          <Link to={`/product/${product_name}`}>
            <h4>
              {product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}
            </h4>

            <div className="card-icons">
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
              <Star className="star" />
            </div>
          </Link>
          <div className="product-price">₵{product.unit_price}</div>
          {/* <Link to="/">
            <h4>{data.shop.name}</h4>
          </Link> */}
        </div>
      </div>
    </>
  )
}

export default ProductCard