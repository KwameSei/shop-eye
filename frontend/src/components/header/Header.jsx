import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search, Compare, Favorite, Person, ShoppingBagOutlined, ShoppingCartCheckout, Message } from "@mui/icons-material";
import swal from "sweetalert";
import axios from "axios";
import { Button } from "@mui/material";
import { Navbar } from "../index";
import { setLogout } from "../../State/auth/authSlice";
import { setProducts } from "../../State/product/productSlice";
import "./Header.scss";
import { Badge } from "@mui/material";

const Header = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
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

      // Update the filteredData state with the fetched products
      // setFilteredData(fetchedProducts);
      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();

    // Initialize filteredData with an empty array when component mounts
    setFilteredData([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Filter the data based on the search input
    const query = value.toLowerCase();
    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(query)
        || product.category.name.toLowerCase().includes(query);
    });

    //Set filteredData to the filtered products or empty array if the query is empty
    setFilteredData(query ? filteredProducts: []);
  };

  return (
    <div>
      <header>
        <div className="nav-container">
          <a href="/" className="logo">
            <h3>Shop Eye</h3>
          </a>
          <Navbar />
        </div>
      </header>
      <div className="second-layer">
        <div className="second-layer-icons">
          <div className="text-icons icons-left">
            <Link className="link">
              <Compare className="icon" />
              <p>
                Compare <br /> Products
              </p>
            </Link>
          </div>
          <div className="text-icons icons-left">
            <Link className="link">
              <Favorite className="icon" />
              <p>
                Favourite <br /> Products
              </p>
            </Link>
          </div>
          <div className="text-icons icons-left">
            <Link className="link">
              <Person className="icon" />
              <p>
                Account <br /> Settings
              </p>
            </Link>
          </div>
        </div>

        <div className="container">
          <div className="search">
            <input
              type="text"
              className="search-term"
              placeholder="What are you looking for?"
              aria-label="What are you looking for?"
              onChange={handleSearch}
              value={searchQuery}
            />
            <span className="searchButton">
              <Search onChange={handleSearch} />
            </span>
          </div>
            {
              filteredData && filteredData.length !== 0 ? (
                <div className="search-results">
                  {filteredData.map((product) => (
                    <div key={product._id}>
                      <h3>{product.name}</h3>
                      {/* Display other product details here */}
                    </div>
                  ))}
                </div>
              ) : (
                ''
              )
            }
        </div>

        <div className="text-icons icons-right">
          <Link className="link cart-badge">
            <Badge badgeContent={1} color="error" sx={{
              '& .MuiBadge-badge': {
                right: -6,
                top: 4,
              },
            }}>
              <ShoppingCartCheckout color="action" className="badge-icon" />
            </Badge>
            <p>
              ₵ 0.00
            </p>
          </Link>
        </div>
        <div className="text-icons icons-right">
          <Link className="link cart-badge">
            <Badge badgeContent={1} color="warning" sx={{
              '& .MuiBadge-badge': {
                right: -6,
                top: 4,
              },
            }}>
              <Message color="action" className="badge-icon" />
            </Badge>
            <p>
              Messages
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
