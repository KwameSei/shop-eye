import React, { useState } from 'react'

const Faqs = () => {
  const [activeTab, setActiveTab] = useState('0');

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    } else {
      setActiveTab('0');
    }
  };

  return (
    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iste, nostrum doloremque vel obcaecati maxime vitae distinctio eligendi suscipit ab asperiores nesciunt repellendus tempore iusto officiis quo accusantium, harum reiciendis.</div>
  )
}

export default Faqs;