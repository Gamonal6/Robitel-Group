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
  /* Blend: dark blue gradient overlay over the hero image */
  background:
    linear-gradient(rgba(var(--deep-purple-rgb), 0.85), rgba(var(--deep-purple-rgb), 0.75)),
    url(${HeroBg}) no-repeat center center/cover;
  color: var(--primary-white);
`;

const HeroText = styled.div`
  max-width: 800px;
`;

const CompanyName = styled.h1`
  font-size: clamp(4rem, 8vw, 6rem);
  color: var(--primary-white);
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
`;

const HeroTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--primary-white);
  margin-bottom: 1rem;
  font-weight: 500;
`;

const HeroSubheading = styled.p`
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  color: var(--primary-white);
  margin-bottom: 2rem;
`;

const HeroCTAButton = styled(Link)`
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

// Modern Interactive Card Grid Section
const CardGridSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  justify-content: center;
`;

const GridContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const InteractiveCard = styled.div`
  background: #ffffff;
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--bright-blue) 0%, var(--deep-purple) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }
  
  &:hover {
    transform: scale(1.05) translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 1;
    }
    
    * {
      color: white !important;
      z-index: 2;
      position: relative;
    }
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  ${InteractiveCard}:hover & {
    animation: iconBounce 0.6s ease;
    transform: scale(1.1);
  }
  
  @keyframes iconBounce {
    0%, 100% { transform: scale(1.1) translateY(0); }
    50% { transform: scale(1.2) translateY(-5px); }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--deep-purple);
  margin-bottom: 1rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: color 0.3s ease;
`;

const CardDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  transition: color 0.3s ease;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bright-blue) 0%, var(--deep-purple) 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  position: relative;
  z-index: 2;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    background: linear-gradient(135deg, var(--deep-purple) 0%, var(--bright-blue) 100%);
  }
  
  ${InteractiveCard}:hover & {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px) scale(1.05);
    }
  }
`;


const Hero = () => {
  return (
    <>
      <HeroContainer>
        <HeroText>
          <CompanyName>ROBITEL</CompanyName>
          <HeroTitle>Stronger Networks Through Smarter Solutions.</HeroTitle>
          <HeroSubheading>Turning STEM Potential into Telecom Performance.</HeroSubheading>
          <HeroCTAButton to="/schedule">Schedule a Meeting Now</HeroCTAButton>
        </HeroText>
      </HeroContainer>
      
      <CardGridSection>
        <GridContainer>
          <InteractiveCard>
            <CardIcon>📡</CardIcon>
            <CardTitle>Meet Our Services</CardTitle>
            <CardDescription>
              Discover how our certified technicians and data-driven solutions can transform your telecommunications operations.
            </CardDescription>
            <CTAButton to="/services">Learn More</CTAButton>
          </InteractiveCard>
          
          <InteractiveCard>
            <CardIcon>📖</CardIcon>
            <CardTitle>Learn Our History</CardTitle>
            <CardDescription>
              From Robinson Crusoe's resilience to modern telecom innovation - explore the inspiring story behind Robitel Group.
            </CardDescription>
            <CTAButton to="/history">Learn More</CTAButton>
          </InteractiveCard>
          
          <InteractiveCard>
            <CardIcon>🎯</CardIcon>
            <CardTitle>Discover Our Mission</CardTitle>
            <CardDescription>
              Learn how we bridge the gap between STEM talent and telecommunications excellence through strategic partnerships.
            </CardDescription>
            <CTAButton to="/about">Learn More</CTAButton>
          </InteractiveCard>
          
          <InteractiveCard>
            <CardIcon>💼</CardIcon>
            <CardTitle>Start the Conversation</CardTitle>
            <CardDescription>
              Ready to enhance your network performance? Get in touch and let's discuss your telecommunications challenges.
            </CardDescription>
            <CTAButton to="/contact">Learn More</CTAButton>
          </InteractiveCard>
        </GridContainer>
      </CardGridSection>
    </>
  );
};

export default Hero;
