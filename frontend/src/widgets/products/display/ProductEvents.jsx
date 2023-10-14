import React from 'react'

// import '../../../components/products/Products.scss';
import './DisplayProducts.scss';
import { ProductEventCard } from '../../../components';

const ProductEvents = () => {
  return (
        <div className="event-card">
          <h2>Popular Events</h2>
          <ProductEventCard />
        </div>
  )
}

export default ProductEvents;