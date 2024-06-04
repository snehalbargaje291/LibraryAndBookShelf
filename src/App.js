import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookSearch from './Components/BookSearch';
import MyBookshelf from './Components/MyBookshelf'; 

function App() {
  return (
    <BrowserRouter basename="">
      <Routes>
        <Route path="/" element={<BookSearch />} />
        <Route path="/bookshelf" element={<MyBookshelf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
