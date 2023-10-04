import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './Banner.scss';

const SectionBelowBanner = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])

  const token = useSelector((state) => state.auth.token);
  // const products = useSelector((state) => state.product.products);
  // console.log("The products: ", products);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  // Fetch products from the database
  const getProducts = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/products/get-products`);
      console.log(response.data);

      const fetchedProducts = response.data.products;
      console.log("I have the products: ", products);
      const fetchedCategories = response.data.categories;
      setProducts(fetchedProducts);
      console.log("The fetched products: ", fetchedProducts);

      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='below-banner'>
        <div className="branding"></div>
        <div id="categories">
          <div className="category-content">
                {categories.map((category) => (
                  <li key={category._id}>
                    <Link to={`/category/${category._id}`}>
                      {category.name}
                      <img src={category.image} />
                    </Link>
                  </li>
                ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SectionBelowBanner;