// Layout.jsx
import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="content-container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;