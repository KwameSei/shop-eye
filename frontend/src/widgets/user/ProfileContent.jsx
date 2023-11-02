import React from 'react'
import ProfilePage from './ProfilePage';
import AllOrders from '../order/AllOrders';
import TrackOrders from '../order/TrackOrders';
import { PaymentMethods, Refund, Address } from '../index';

const ProfileContent = ({ active }) => {
  return (
    <div className='profile-content'>
      <div className="content-inner">
        {
          active === 1 && <div className='item-main'>
            <h1>Profile</h1>
            <ProfilePage />
          </div>
        }
        {
          active === 2 && <div className='item-main'>
            <h1>Orders</h1>
            <AllOrders />
          </div>
        }
        {
          active === 3 && <div className='item-main'>
            <h1>Refund</h1>
            <Refund />
          </div>
        }
        {
          active === 4 && <div className='item-main'>
            <h1>Inbox</h1></div>
        }
        {
          active === 5 && <div className='item-main'>
            <h1>Track Order</h1>
            <TrackOrders />
          </div>
        }
        {
          active === 6 && <div className='item-main'>
            <h1>Payment Methods</h1>
            <PaymentMethods />
          </div>
        }
        {
          active === 7 && <div className='item-main'>
            <h1>Address</h1>
            <Address />
          </div>
        }
      </div>
    </div>
  )
}

export default ProfileContent;