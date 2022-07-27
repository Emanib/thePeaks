import './assest/index.scss';
import Home from './pages/Home';
import Article from './pages/Article'
// import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom";
import BookMark from './pages/BookMark'
// import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import { GlobalProvider } from './context/GlobalState'
function App()
{

  return (
    <GlobalProvider>
      <Layout>
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmark" element={<BookMark />} />
          <Route path="*" element={<Article />} />
        </Routes>
        <Footer />
      </Layout>
    </GlobalProvider>
  );
}

export default App;
