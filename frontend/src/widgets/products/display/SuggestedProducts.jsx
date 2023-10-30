import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ProductCard } from '../../../components';

const SuggestedProducts = ({ data }) => {
  const [products, setProducts] = useState(null);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  const getSuggestedProducts = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/products/related-products/${data._id}`);
      const responseData = response.data;

      if (responseData.success) {
        setProducts(responseData.products);
        console.log('Suggested Products Fetched', responseData);
      } else {
        console.log(responseData.message);
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getSuggestedProducts();
  }, [data]);

  return (
    <div>
      {
        data ? (
          <div className='suggested-products'>
            <h3>Suggested Products</h3>
            <div className='suggested-products-container'>
              {
                products && products.map((product, index) => (
                  <Link to={`/products/${product._id}`} key={product._id}>
                    {/* <div className='suggested-products-item'>
                      <img src={product.image.url} alt={product.name} />
                      <div className='suggested-products-item-content'>
                        <h4>{product.name}</h4>
                        <p>₵{product.unit_price}</p>
                      </div>
                    </div> */}
                    <ProductCard data={product} key={product} />
                  </Link>
                ))
              }
            </div>
          </div>
        ) : (
          null
        )
      }
    </div>
  )
}

export default SuggestedProducts;