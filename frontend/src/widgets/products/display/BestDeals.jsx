import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ProductCard } from '../../../components';
import { Loader } from '../../../components';
import './DisplayProducts.scss';

const BestDeals = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [isLoading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  // const products = useSelector((state) => state.product.products);
  // console.log("The products: ", products);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  // Fetch products from the database
  const getProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${serverURL}/api/products/get-products`);
      console.log(response.data);

      const fetchedProducts = response.data.products.sort((a, b) => b.total_sell - a.total_sell);
      const firstFourProducts = fetchedProducts.slice(0, 4);  // Get the first four products
      console.log("The first four products: ", firstFourProducts);
      setProducts(firstFourProducts);
      // console.log("I have the products: ", products);
      // const fetchedCategories = response.data.categories;
      // setProducts(fetchedProducts);
      // console.log("The fetched products: ", fetchedProducts);

      // setProducts(fetchedProducts);
      // setCategories(fetchedCategories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='best-deals'>
      <div className="best-deals-content">
        <h2>Best Deals</h2>
        <div className="best-deals-products">
          {products.map((i, index) => (
            <ProductCard key={index} product={i} /> // product={i} is the same as product={product}
          ))}
        </div>
      </div>
      {
        isLoading && <Loader />
      }
    </div>
  )
}

export default BestDeals;