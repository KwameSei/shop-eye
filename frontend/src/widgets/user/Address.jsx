import React from 'react';
import { Button } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

import '../finance/PaymentMethods.scss';

const Address = () => {
  return (
    <div className='payment'>
      <div className="payment-inner">
        <div className="buttons">
          <Button variant='contained' color='primary'>
            Add New Card
          </Button>
        </div>
      </div>
      <div className="methods">
        <div className="methods-inner">
          <div className="username">Default</div>
        </div>
        <div className="card-number">
          <span>Adjacent Chantan Market - Accra</span>
        </div>
        <div className="card-number">
          <span>+233 245202460</span>
        </div>
        <div className="action">
          <DeleteOutline />
        </div>
      </div>
    </div>
  )
}

export default Address;