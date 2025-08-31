import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Keyframes for animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const PartnersContainer = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.5s ease-out;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  color: var(--deep-purple);
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--text-color);
  opacity: 0.8;
  max-width: 700px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: var(--teal);
  text-align: center;
  margin-bottom: 2.5rem;
  font-weight: 700;
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  align-items: center;
`;

const LogoCard = styled.div`
  background: var(--primary-white);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--light-gray-2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
`;

const LogoPlaceholder = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  opacity: 0.7;
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, var(--deep-purple), var(--teal));
  color: var(--primary-white);
  padding: 4rem 2rem;
  border-radius: 16px;
  text-align: center;
  margin-top: 2rem;
`;

const CTATitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0.9;
`;

const CTAButton = styled.button`
  background: var(--primary-white);
  color: var(--deep-purple);
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const Partners = () => {
  const navigate = useNavigate();

  const universityPartners = [
    'University of Texas',
    'Texas A&M',
    'Rice University',
    'Southern Methodist University',
  ];

  const corporatePartners = [
    'AT&T',
    'Verizon',
    'T-Mobile',
    'Crown Castle',
  ];

  return (
    <PartnersContainer>
      <Header>
        <Title>Our Partners</Title>
        <Subtitle>
          We collaborate with leading universities and telecommunication companies to bridge the gap between education and industry, creating a pipeline of skilled, workforce-ready talent.
        </Subtitle>
      </Header>

      <Section>
        <SectionTitle>University Partners</SectionTitle>
        <LogoGrid>
          {universityPartners.map((name) => (
            <LogoCard key={name}>
              <LogoPlaceholder>{name}</LogoPlaceholder>
            </LogoCard>
          ))}
        </LogoGrid>
      </Section>

      <Section>
        <SectionTitle>Corporate Partners</SectionTitle>
        <LogoGrid>
          {corporatePartners.map((name) => (
            <LogoCard key={name}>
              <LogoPlaceholder>{name}</LogoPlaceholder>
            </LogoCard>
          ))}
        </LogoGrid>
      </Section>

      <CTASection>
        <CTATitle>Become a Partner</CTATitle>
        <CTAText>
          Join us in shaping the future of the telecommunications industry. Partner with Robitel Group to access top talent and drive innovation.
        </CTAText>
        <CTAButton onClick={() => navigate('/contact')}>Contact Us</CTAButton>
      </CTASection>
    </PartnersContainer>
  );
};

export default Partners;
