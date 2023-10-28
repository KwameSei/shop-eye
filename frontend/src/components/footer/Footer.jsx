import React from 'react';
import { Link } from 'react-router-dom';
import { ProductLinks } from './ProductLinks.js';

import './Footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-inner">
        <div className="footer-items">
          <h3>Get to Know Us</h3>
          <div className="subscribe">
            <span className='subscribe-inner'>
              Subscribe
            </span> to get news, <br /> updates and information
          </div>
          <div className="subscribe-input">
            <input type="text" placeholder='Enter Your Email' />
            <button>Subscribe</button>
          </div>
          <div className="company">
            <h2>Company</h2>
            {
              ProductLinks.map((item, index) => {
                return (
                  <p key={index}>
                    <Link to={item.link}>{item.title}</Link>
                  </p>
                )
              })
            }
          </div>
          <p>Careers</p>
          <p>Blog</p>
          <p>About Amazon</p>
          <p>Investor Relations</p>
          <p>Amazon Devices</p>
        </div>
        <div className="footer-items">
          <h3>Make Money with Us</h3>
          <p>Sell products on Amazon</p>
          <p>Sell apps on Amazon</p>
          <p>Become an Affiliate</p>
          <p>Advertise Your Products</p>
          <p>Self-Publish with Us</p>
          <p>Host an Amazon Hub</p>
        </div>
        <div className="footer-items">
          <h3>Amazon Payment Products</h3>
          <p>Amazon Business Card</p>
          <p>Shop with Points</p>
          <p>Reload Your Balance</p>
          <p>Amazon Currency Converter</p>
        </div>
        <div className="footer-items">
          <h3>Let Us Help You</h3>
          <p>Amazon and COVID-19</p>
          <p>Your Account</p>
          <p>Your Orders</p>
          <p>Shipping Rates & Policies</p>
          <p>Returns & Replacements</p>
          <p>Manage Your Content and Devices</p>
          <p>Amazon Assistant</p>
          <p>Help</p>
        </div>
      </div>
      <div className="copyrights">
        <div className="copy-inner">
          <p>© 2023, Shop Eye, or its affiliates. Created by Nathaniel Osei. All rights reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;