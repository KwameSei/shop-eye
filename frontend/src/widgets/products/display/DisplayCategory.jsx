import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { ProductCard } from '../../../components';

import '../../Common.scss';

const DisplayCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  const serverURL = import.meta.env.VITE_SERVER_URL;
  console.log('Server URL:', serverURL);
  
  // Fetch category and its products from the API
  const getCategoryProducts = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/products/${id}/products`);

      // Check if the response contains category and products data
      if (response.data && response.data.category && response.data.products) {
        setCategory(response.data.category);
        setProduct(response.data.products);
      } else {
        setError('Category or products not found');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getCategoryProducts();
  }, [id]);

  return (
    <div className='main'>
      {category && (
        <div>
          <h2>{category.name}</h2>
          {/* <p>Description: {category.description}</p> */}
        </div>
      )}
      <h2>Products</h2>
      <div className='products'>
      {
        product && product.map((i, index) => <ProductCard key={index} product={i} />
      )}
      {
        product && product.length === 0 ? (
          <div className="no-products">
            <h2>No products found</h2>
          </div>
        ) : null
      }
      </div>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DisplayCategory;
