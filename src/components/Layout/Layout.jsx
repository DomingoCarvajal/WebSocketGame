// Layout.jsx
import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Layout.css'; // Importa el CSS de estilo general

const Layout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="content-container">{children}</div>
    </div>
  );
};

export default Layout;
