import React from 'react';
import { Button } from '@mui/material';

import './PaymentMethods.scss';
import { DeleteOutline } from '@mui/icons-material';

const PaymentMethods = () => {
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
          <img src='https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg' alt='visa' />
          <div className="username">Nathaniel Osei</div>
        </div>
        <div className="card-number">
          <span>1234 **** **** ****</span>
          <span>Exp: 12/22</span>
        </div>
        <div className="action">
          <DeleteOutline />
        </div>
      </div>
    </div>
  )
}

export default PaymentMethods;