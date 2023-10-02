import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import './Banner.scss'

const Banner = () => {
  return (
    <div className='banner'
      style={{
        position: 'absolute',
        overflow: 'hidden',
        width: '1100px',
        height: '70vh',
        // minHeight: '500px',
        // maxHeight: '800px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: 'white',
        textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backgroundImage: 'url(/images/banner.jpg)',
        backgroundSize: 'cover',
        // backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed',
        // background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))',
        // '&:before': {
        //   content: '""',
        //   position: 'absolute',
        //   top: '0',
        //   left: '0',
        //   width: '100%',
        //   height: '100%',
        //   background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
        // },
        // '&:after': {
        //   content: '""',
        //   position: 'absolute',
        //   bottom: '0',
        //   left: '0',
        //   width: '100%',
        //   height: '100%',
        //   background: 'linear-gradient(rgba(0, 0, 0, 0.7), transparent)',
        // },
      }}
    // style={{ backgroundImage: `url(${banner})` }}
    >
      <div className='banner__content'>
        <h1 className='banner__title'>Welcome to Shop Eye Store</h1>
        <p className='banner__text'>Shop for your favorite products</p>

        <Link to='/shop' className='banner-action'>
        <div className='button'>
          <span>
            <Button variant='contained' color='primary' size='large'>
              Shop Now
            </Button>
          </span>
        </div>
      </Link>
      </div>
    </div>
  )
}

export default Banner