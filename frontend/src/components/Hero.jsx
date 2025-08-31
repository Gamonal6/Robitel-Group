import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeroBg from '../assets/hero-background.png';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 2rem;
  /* Blend: blue/teal gradient overlay over the hero image */
  background:
    linear-gradient(rgba(var(--bright-blue-rgb), 0.72), rgba(var(--aqua-rgb), 0.78)),
    url(${HeroBg}) no-repeat center center/cover;
  color: var(--primary-white);
`;

const HeroText = styled.div`
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: var(--primary-white);
`;

const HeroSubheading = styled.p`
  font-size: 1.2rem;
  color: var(--primary-white);
`;

const CTAButton = styled(Link)`
  background-color: transparent;
  color: var(--primary-white);
  padding: 0.9rem 1.8rem;
  border-radius: 6px;
  border: 2px solid var(--primary-white);
  text-decoration: none;
  font-size: 1.2rem;
  display: inline-block;
  margin-top: 1rem;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: rgba(var(--primary-white-rgb), 0.12);
    border-color: var(--aqua);
  }
`;


const Hero = () => {
  return (
    <HeroContainer>
      <HeroText>
        <HeroTitle>Skilled Telecom Talent + Data-Driven Insights</HeroTitle>
        <HeroSubheading>Certified technicians delivering reliable service and customer satisfaction.</HeroSubheading>
        <CTAButton to="/schedule">Schedule a Meeting Now</CTAButton>
      </HeroText>
    </HeroContainer>
  );
};

export default Hero;
