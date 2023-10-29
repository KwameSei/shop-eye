import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { ProductCard } from '../../../components';
import { setProduct, setProductCategories, setProducts } from '../../../State/product/productSlice';
import '../../Common.scss';

const serverURL = import.meta.env.VITE_SERVER_URL;

const BestSelling = () => {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [productData, setProductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  // Fetch products from the API
  const getProducts = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/products/get-products`);
      console.log('API Response:', response.data);

      const fetchedProducts = response.data.products;
      const categories = response.data.categories;

      setProduct(fetchedProducts);

    } catch (error) {
      console.log('API Error:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const product = productData && productData.sort((a, b) => b.totalSold - a.totalSold);
    setData(product);
  }, []);

  return (
    <div className='main'>
      <div className="products-display">
        <div className="products-display-inner">
          <div className="products-display-items">

            <h2>Best Selling Products</h2>
            {
              product && product.map((i, index) => <ProductCard key={index} product={i} />
            )}
            { console.log('Data:', product)}
            {/* {
              product && product.length === 0 ? (
                <div className="no-products">
                  <h2>No products found</h2>
                </div>
              ) : null
            } */}
            {console.log('Data:', product)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestSelling;