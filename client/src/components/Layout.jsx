import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './styles.css';

const Layout = () => (
  <div>
    <header className="navbar">
      <h1>My Blog</h1>
      <nav>
        <Link to="/">Posts</Link>
        <Link to="/create">New Post</Link>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
