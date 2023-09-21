import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Send } from '@mui/icons-material';
import { Button, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import Select from 'react-select';
import { setProductCategory, setProduct } from '../../../State/product/productSlice';
import '../../Common.scss';

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]); // For the multiselect dropdown
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [unit_price, setUnitPrice] = useState('');
  const [carton_price, setCartonPrice] = useState('');
  const [carton_size, setCartonSize] = useState('');
  const [image, setImage] = useState(null);


  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const product = useSelector((state) => state.pos.product);

  useEffect(() => {
    console.log('selected product categories:', selectedCategories);
    console.log('products:', products);
  }, [selectedCategories, categories]);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    // Fetch available products
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
        setProducts(productOptions);
      } else {
        console.log('No products found in the API response.');
        setCategories([]);
        setProducts([]);
      }
    })
    .catch((error) => {
      console.error('Error fetching Products with Categories:', error);
    });
  }, []);  

  const showPreviewImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImagePreview(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleProduct = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('stock', stock);
    formData.append('unit_price', unit_price);
    formData.append('carton_price', carton_price);
    formData.append('carton_size', carton_size);
    formData.append('image', image);
    formData.append('category', selectedCategories.map((category) => category.value).join(','));
    
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await axios.post(`${serverURL}/api/products/create-product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response:', response);
      const { data } = response;
      dispatch(setProduct(data.product));
      dispatch(setProductCategory(data.productCategory));
      navigate('/dashboard');
      setSelectedProduct(data.product);

      // Reset the form
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong!');
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProduct();
  };

  return (
    <>
      <div className="register-box main">
        <div className="register-logo">
          <a href="../../index2.html">Shop Eye</a>

          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg">Create Product</p>

              <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                  <DialogContentText>Please enter your details here.</DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    inputProps={{ minLength: 2, maxLength: 50 }}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="stock"
                    label="Stock"
                    type="number"
                    fullWidth
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    inputProps={{ minLength: 2, maxLength: 50 }}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="unit_price"
                    label="Unit Price"
                    type="number"
                    fullWidth
                    value={unit_price}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    inputProps={{ minLength: 2, maxLength: 50 }}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="carton_price"
                    label="Carton Price"
                    type="number"
                    fullWidth
                    value={carton_price}
                    onChange={(e) => setCartonPrice(e.target.value)}
                    inputProps={{ minLength: 2, maxLength: 50 }}
                    required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="carton_size"
                    label="Carton Size"
                    type="number"
                    fullWidth
                    value={carton_size}
                    onChange={(e) => setCartonSize(e.target.value)}
                    inputProps={{ minLength: 2, maxLength: 50 }}
                    required
                  />
                  {/* Create image */}
                  <input
                    type="file"
                    name='image'
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setImage(file);
                      showPreviewImage(e);
                    }}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ height: '100px', width: '100px' }}
                    />
                  )}

                  <Select
                    isMulti
                    options={categories}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={selectedCategories}
                    onChange={(selectedOptions) => setSelectedCategories(selectedOptions)}
                    // onChange={(selectedOptions) => setSelectedPosMachines(selectedOptions)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button 
                    type="submit"
                    color="primary" 
                    endIcon={<Send />}
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
