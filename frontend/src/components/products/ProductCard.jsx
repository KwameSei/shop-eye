import React, { useState } from 'react';
import './Products.scss';
import { Link, useParams } from 'react-router-dom';
import { Add, Delete, Favorite, FavoriteBorder, Remove, ShoppingBag, ShoppingCart, Star, Visibility } from '@mui/icons-material';
import { ProductDetailsCard } from '../index';

const ProductCard = ({ product }) => {
  const { id } = useParams();
  const [click, setClick] = useState(false);
  // const { name, image, unit_price } = product
  const [open, setOpen] = useState(false);

  const d = product.name; // Get the product name
  const product_name = d.replace(/\s+/g, '-').toLowerCase(); // Replace spaces with dashes and convert to lowercase
  return (
    <>
      <div className='product-card'>
        <div className="product-content">
          <Link to={`/product/${product._id}`} className='link'>
            {/* <div className="product-image"> */}
              <img src={product.image.url} alt={product.name} className='image' />
            {/* </div> */}
          </Link>
          <Link to={`/product/${product_name}`} className='link'>
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
          <div className="all-prices">
            <div className="product-price">
              {product.unit_price ? "₵" + product.unit_price : null}
            </div>
            <span>
              { product.sold } sold
            </span>
          </div>
          {/* <Link to="/">
            <h4>{data.shop.name}</h4>
          </Link> */}
        </div>

        {/* Side icons */}
        <div className="side-icons">
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
          <Visibility
            className="visibility"
            onClick={() => setOpen(!open)}
            titleAccess='View product'
          />
          <ShoppingCart className="shopping-bag"
            onClick={() => setOpen(!open)}
            titleAccess='Add to cart'
          />

          {/* Open and close modal */}
          {
            open ? (
              <ProductDetailsCard
                // open={open}
                setOpen={setOpen}
                product={product}
              />
            ) : null
          }
          
          {/* <div className="product-quantity">
            <span>1</span>
            <div className="quantity-icons">
              <Add className="add" />
              <Remove className="remove" />
              <Delete className="delete" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default ProductCard