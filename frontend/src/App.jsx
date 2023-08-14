import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar, Header, Footer } from './components'
import { Dashboard, Auth, Home } from './widgets';

import './App.css'

function App() {

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/header" element={<Header />} Header />
          <Route path="/sidebar" element={<Sidebar />} Sidebar />
          <Route path="/login" element={<Auth />} Auth />
          <Route path="/dashboard" element={<Dashboard />} Dashboard />
          <Route path="/footer" element={<Footer />} Footer />
          <Route path="/" element={<Home />} Home />
        </Routes>
      </div>
    </Router>
  )
}

export default App
