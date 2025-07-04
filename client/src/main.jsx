import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import PostList from './pages/PostList';
import PostForm from './pages/PostForm';

import './index.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="create" element={<PostForm />} />
        <Route path="edit/:id" element={<PostForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
