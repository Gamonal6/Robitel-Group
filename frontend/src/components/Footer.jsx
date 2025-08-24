import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: var(--primary-white);
  color: var(--text-color);
  padding: 4rem 2rem 2rem;
  border-top: 1px solid var(--aqua);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 2rem;
`;

const FooterColumn = styled.div`
  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--deep-purple);
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const FooterLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    color: var(--teal);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: var(--text-color);
    font-size: 1.5rem;
    opacity: 0.8;

    &:hover {
      opacity: 1;
      color: var(--teal);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--aqua);
  opacity: 0.6;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        <FooterColumn>
          <h4>Robitel Group</h4>
          <p>Your trusted partner in telecom workforce solutions.</p>
        </FooterColumn>
        <FooterColumn>
          <h4>Quick Links</h4>
          <ul>
            <li><FooterLink to="/">Home</FooterLink></li>
            <li><FooterLink to="/about">About Us</FooterLink></li>
            <li><FooterLink to="/services">Services</FooterLink></li>
            <li><FooterLink to="/contact">Contact</FooterLink></li>
          </ul>
        </FooterColumn>
        <FooterColumn>
          <h4>Contact Us</h4>
          <p>contact@telecomworkforce.com</p>
          <p>(123) 456-7890</p>
        </FooterColumn>
        <FooterColumn>
          <h4>Follow Us</h4>
          <SocialLinks>
            {/* Replace with actual social media icons */}
            <a href="#">FB</a>
            <a href="#">TW</a>
            <a href="#">IN</a>
          </SocialLinks>
        </FooterColumn>
      </FooterGrid>
      <Copyright>
        &copy; {new Date().getFullYear()} Robitel Group. All Rights Reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
