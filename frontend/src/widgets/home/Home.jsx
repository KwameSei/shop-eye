import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../State/product/productSlice';
import{ Banner, SectionBelowBanner } from '../../components';
import { BestDeals } from '../index';
import '../Common.scss';


const Home = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]); // For the multiselect dropdown
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const products = useSelector(state => state.product.product);
  console.log('Products:', products);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(getProduct(token, user));
    console.log('Token:', token);
  }, [dispatch, token, user]);

  const getProducts = () => {
    axios.get(`${serverURL}/api/products/get-products`)
    .then((response) => {
      console.log('API Response:', response.data);

      if (Array.isArray(response.data.products)) {
        const productOptions = response.data.products.map((product) => ({
          value: product._id,
          label: product.name,
        }));

        const categoryOptions = response.data.categories.map((category) => ({
          value: category._id,
          label: category.name,
        }));

        console.log('Product Options:', productOptions);
        console.log('Category Options:', categoryOptions);

        setCategories(categoryOptions);
        setProduct(productOptions);
      } else {
        console.log('No products found in the API response.');
        setCategories([]);
        setProduct([]);
      }
    })
    .catch((error) => {
      console.log('API Error:', error);
      setError(error.message);
    });
  };

  return (
    <div className='main'>
      <Banner />
      <SectionBelowBanner />
      <BestDeals />
    </div>
  )
}

export default Home