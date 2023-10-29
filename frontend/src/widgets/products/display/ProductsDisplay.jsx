import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { ProductCard } from '../../../components';
import { setProduct, setProductCategories, setProducts } from '../../../State/product/productSlice';
import '../../Common.scss';

const serverURL = import.meta.env.VITE_SERVER_URL;

const ProductsDisplay = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get('category');
  const productData = searchParams.get('product');
  const brandData = searchParams.get('brand');
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
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

      // if (Array.isArray(fetchedProducts)) {  // Check if products exist in the API response
      //   const productOptions = fetchedProducts.map((product) => ({ // Map through the products array and create options for the select element
      //     value: product._id, // The value property of the option element will be the product ID
      //     label: product.name,  // The label property of the option element will be the product name
      //   }));

      //   const categoryOptions = response.data.categories.map((category) => ({
      //     value: category._id,
      //     label: category.name,
      //   }));

      //   console.log('Product Options:', productOptions);
      //   console.log('Category Options:', categoryOptions);

      //   setCategories(categoryOptions);
      //   setProduct(productOptions);
      // } else {
      //   console.log('No products found in the API response.');
      //   setCategories([]);
      //   setProduct([]);
      // }
    } catch (error) {
      console.log('API Error:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products based on the category selected
  useEffect(() => {
    if (categoryData === null) {  // If no category is selected, display all products
      const filteredProducts = productData && productData.sort((a, b) => a.totalSold - b.totalSold);
      setData(filteredProducts);
    } else {
      const filteredProducts = productData && productData.filter((product) => product.category === categoryData);
      setData(filteredProducts);
    };
    // window.scrollTo(0, 0);  // Scroll to the top of the page
  }, []);

  return (
    <div className='main'>
      <div className="products-display">
        <div className="products-display-inner">
          <div className="products-display-items">

          {/* <h2>Products</h2>
            <select>
              {product.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <h2>Categories</h2>
            <select>
              {categories.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select> */}

            <h2>Product List</h2>
            {
              product && product.map((i, index) => <ProductCard key={index} product={i} />
            )}
            { console.log('Data:', product)}
            {
              product && product.length === 0 ? (
                <div className="no-products">
                  <h2>No products found</h2>
                </div>
              ) : null
            }
            {console.log('Data:', product)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsDisplay;