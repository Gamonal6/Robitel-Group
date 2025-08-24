import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import History from './pages/History';
import Partners from './pages/Partners';
import Contact from './pages/Contact';
import ScheduleMeeting from './pages/ScheduleMeeting';
import './App.css';

const ContentContainer = styled.div`
  padding: 0 2rem;
`;

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<ContentContainer><About /></ContentContainer>} />
        <Route path="/services" element={<ContentContainer><Services /></ContentContainer>} />
        <Route path="/history" element={<ContentContainer><History /></ContentContainer>} />
        {/* <Route path="/partners" element={<ContentContainer><Partners /></ContentContainer>} /> */}
        <Route path="/contact" element={<ContentContainer><Contact /></ContentContainer>} />
        <Route path="/schedule" element={<ContentContainer><ScheduleMeeting /></ContentContainer>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
