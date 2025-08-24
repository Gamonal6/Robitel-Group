import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: var(--primary-white);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  box-sizing: border-box;
`;

const Brand = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--deep-purple);
  text-decoration: none;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 1001;

  span {
    height: 2px;
    width: 25px;
    background: var(--deep-purple);
    margin-bottom: 4px;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--primary-white);
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  z-index: 1000;
`;

const NavLink = styled(Link)`
  color: var(--deep-purple);
  text-decoration: none;

  &:hover {
    color: var(--teal);
  }

  &.mobile-link {
    color: var(--deep-purple);
    font-size: 1.5rem;
    margin: 1rem 0;
  }
`;

const CTAButton = styled(Link)`
  background-color: var(--deep-purple);
  color: var(--primary-white);
  padding: 0.6rem 1rem;
  border-radius: 6px;
  border: none;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: var(--teal);
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Nav scrolled={scrolled}>
        <Brand to="/" scrolled={scrolled}>Robitel Group</Brand>
        <NavMenu>
          <NavLink to="/" scrolled={scrolled}>Home</NavLink>
          <NavLink to="/about" scrolled={scrolled}>About</NavLink>
          <NavLink to="/services" scrolled={scrolled}>Services</NavLink>
          <NavLink to="/history" scrolled={scrolled}>History</NavLink>
          {/* <NavLink to="/partners" scrolled={scrolled}>Partners</NavLink> */}
          <NavLink to="/contact" scrolled={scrolled}>Contact Us</NavLink>
        </NavMenu>
        <CTAButton to="/schedule" scrolled={scrolled}>Schedule a Meeting Now</CTAButton>
        <Hamburger onClick={() => setIsOpen(!isOpen)} scrolled={scrolled} isOpen={isOpen}>
          <span />
          <span />
          <span />
        </Hamburger>
      </Nav>
      <MobileMenu isOpen={isOpen}>
        <NavLink to="/" className="mobile-link" onClick={() => setIsOpen(false)}>Home</NavLink>
        <NavLink to="/about" className="mobile-link" onClick={() => setIsOpen(false)}>About</NavLink>
        <NavLink to="/services" className="mobile-link" onClick={() => setIsOpen(false)}>Services</NavLink>
        <NavLink to="/history" className="mobile-link" onClick={() => setIsOpen(false)}>History</NavLink>
        {/* <NavLink to="/partners" className="mobile-link" onClick={() => setIsOpen(false)}>Partners</NavLink> */}
        <NavLink to="/contact" className="mobile-link" onClick={() => setIsOpen(false)}>Contact Us</NavLink>
      </MobileMenu>
    </>
  );
};

export default Navbar;
