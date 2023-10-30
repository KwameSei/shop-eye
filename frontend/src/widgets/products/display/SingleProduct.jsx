import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from '../../../components';
import ProductDetails from './ProductDetails';
import axios from 'axios';
import { toast } from 'react-toastify';

import '../../Common.scss';
import SuggestedProducts from './SuggestedProducts';

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [productData, setProductData] = useState([]);

  const serverURL = import.meta.env.VITE_SERVER_URL;
  
  // const productName = name.replace(/-/g, ' ');

  // Fetch product data from backend
  const getProductData = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/products/product/${id}`);
      
      const responseData = response.data;
      console.log('Response from API: ', responseData);

      if (responseData.success) {
        setData(responseData.product);
        console.log('Products Fetched', responseData);
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
    getProductData();
  }, [id]);
  

  // useEffect(() => {
  //   const data = productData && productData.find(product => product.name === productName);
  //   setData(data);
  // }, [ productName, productData ])

  return (
    <div className='main'>
      <ProductDetails data={data} />
      {
        data && <SuggestedProducts data={data} />
      }
      <Footer />
    </div>
  )
}

export default SingleProduct;