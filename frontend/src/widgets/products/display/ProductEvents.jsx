import React from 'react'

import '../../Common.scss';

// import '../../../components/products/Products.scss';
import './DisplayProducts.scss';
import { ProductEventCard } from '../../../components';

const ProductEvents = () => {
  return (
    <div className="event-card main">
      <h2>Popular Events</h2>
      <ProductEventCard />
    </div>
  )
}

export default ProductEvents;