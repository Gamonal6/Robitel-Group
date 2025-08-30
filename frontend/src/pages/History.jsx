import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const PageContainer = styled.div`
  padding: 0;
  margin: 0;
  overflow-x: hidden;
`;

// Hero Section with Island to City Transformation
const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    #1e3a8a 0%,
    #3b82f6 25%,
    #06b6d4 50%,
    #10b981 75%,
    #f59e0b 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 8s ease-in-out infinite;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><defs><linearGradient id="island" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:%23065f46;stop-opacity:0.8"/><stop offset="50%" style="stop-color:%23047857;stop-opacity:0.6"/><stop offset="100%" style="stop-color:%23059669;stop-opacity:0.4"/></linearGradient></defs><path d="M0,400 Q200,350 400,380 T800,360 Q1000,340 1200,380 L1200,600 L0,600 Z" fill="url(%23island)"/><circle cx="150" cy="200" r="8" fill="%23f59e0b" opacity="0.8"/><rect x="300" y="150" width="4" height="80" fill="%23374151" opacity="0.7"/><rect x="500" y="120" width="6" height="110" fill="%23374151" opacity="0.8"/><rect x="700" y="100" width="5" height="130" fill="%23374151" opacity="0.9"/><rect x="900" y="80" width="8" height="150" fill="%23374151"/></svg>') center/cover no-repeat;
    opacity: 0.3;
    animation: islandTransform 6s ease-in-out infinite alternate;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.2) 100%);
  }
`;

const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const islandTransform = keyframes`
  0% { transform: scale(1) rotate(0deg); opacity: 0.3; }
  100% { transform: scale(1.1) rotate(1deg); opacity: 0.5; }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 10;
  position: relative;
  color: white;
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: ${fadeInUp} 1s ease-out;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 2rem);
  margin: 0;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  animation: ${fadeInUp} 1s ease-out 0.3s both;
`;

// Name Reveal Section
const NameRevealSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  text-align: center;
`;

const NameRevealContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const NameEquation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 3rem 0;
  flex-wrap: wrap;
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const NamePart = styled.div`
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 600;
  color: #1e40af;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  
  &.typing {
    width: 0;
    animation: ${typing} 2s steps(20) forwards;
    border-right: 3px solid #1e40af;
  }

  &.robinson { animation-delay: 0.5s; }
  &.telecom { animation-delay: 2.5s; }
  &.robitel { 
    animation-delay: 4.5s;
    color: #059669;
    font-weight: 700;
  }
`;

const PlusSign = styled.div`
  font-size: clamp(2rem, 5vw, 4rem);
  color: #6b7280;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease-out 2s both;
`;

const EqualsSign = styled.div`
  font-size: clamp(2rem, 5vw, 4rem);
  color: #6b7280;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease-out 4s both;
`;

const Tagline = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: #374151;
  margin-top: 2rem;
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease-out 5.5s both;
`;

// Timeline Section
const TimelineSection = styled.section`
  padding: 6rem 2rem;
  background: white;
`;

const TimelineContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TimelineTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-align: center;
  color: #1e40af;
  margin-bottom: 4rem;
`;

const Timeline = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #1e40af, #059669);
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 2rem;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
  position: relative;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    @media (max-width: 768px) {
      flex-direction: row;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: row;
    margin-left: 4rem;
  }
`;

const TimelineContent = styled.div`
  flex: 1;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin: 0 2rem;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    border-color: #1e40af;
  }
  
  @media (max-width: 768px) {
    margin: 0 0 0 2rem;
  }
`;

const TimelineIcon = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  z-index: 10;
  
  @media (max-width: 768px) {
    left: 2rem;
    transform: translateX(-50%);
  }
`;

const TimelineYear = styled.h3`
  font-size: 1.5rem;
  color: #1e40af;
  margin: 0 0 1rem 0;
  font-weight: 700;
`;

const TimelineDescription = styled.p`
  color: #374151;
  line-height: 1.6;
  margin: 0;
`;

// Split Screen Section
const SplitScreenSection = styled.section`
  min-height: 100vh;
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const SplitPane = styled.div`
  flex: 1;
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  
  &.crusoe {
    background: linear-gradient(135deg, #0f766e 0%, #059669 100%);
    color: white;
  }
  
  &.robitel {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    color: white;
  }
`;

const SplitTitle = styled.h3`
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 2rem;
  font-weight: 700;
`;

const SplitContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.8;
`;

const ChallengeArrow = styled.div`
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  color: #f59e0b;
  z-index: 10;
  
  @media (max-width: 768px) {
    position: static;
    text-align: center;
    transform: rotate(90deg);
    margin: 2rem 0;
  }
`;

// Quote Section
const QuoteSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  text-align: center;
  color: white;
`;

const QuoteContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const QuoteText = styled.blockquote`
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-style: italic;
  margin: 0 0 2rem 0;
  position: relative;
  
  &::before,
  &::after {
    content: '"';
    font-size: 4rem;
    color: #f59e0b;
    position: absolute;
  }
  
  &::before {
    top: -1rem;
    left: -2rem;
  }
  
  &::after {
    bottom: -3rem;
    right: -2rem;
  }
`;

const QuoteAuthor = styled.cite`
  font-size: 1.2rem;
  color: #d1d5db;
  font-style: normal;
`;

// CTA Section
const CTASection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  text-align: center;
  color: white;
`;

const CTATitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 2rem;
  font-weight: 700;
`;

const CTAButton = styled.button`
  background: white;
  color: #059669;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.3);
    background: #f8fafc;
  }
`;

// Scroll reveal component
const Reveal = styled.div`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? '0' : '30px')});
  transition: all 0.8s ease;
`;

const RevealOnScroll = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Reveal ref={ref} visible={visible}>
      {children}
    </Reveal>
  );
};

const History = () => {
  const navigate = useNavigate();
  const [nameRevealed, setNameRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setNameRevealed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const timelineData = [
    {
      year: "1719",
      title: "Robinson Crusoe Published",
      description: "Daniel Defoe's masterpiece introduces the world to themes of resilience, ingenuity, and survival against all odds — values that would later inspire our company's foundation."
    },
    {
      year: "2020",
      title: "Robitel Group Founded",
      description: "Drawing inspiration from Robinson Crusoe's resourcefulness, we established Robitel Group to bridge the gap between talented individuals and the telecommunications industry."
    },
    {
      year: "2021",
      title: "University Partnerships",
      description: "Formed strategic partnerships with leading universities to create comprehensive training and certification programs for emerging telecommunications professionals."
    },
    {
      year: "2022",
      title: "Dashboard Solutions Launch",
      description: "Launched our first KPI consulting and dashboard services, helping telecom companies visualize and optimize their operations with data-driven insights."
    },
    {
      year: "2023",
      title: "Network Expansion",
      description: "Expanded our network of certified technicians and consulting services, establishing Robitel Group as a trusted partner in telecommunications excellence."
    }
  ];

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Our History</HeroTitle>
          <HeroSubtitle>From resilience to innovation — the story behind Robitel Group</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* Name Reveal Section */}
      <NameRevealSection>
        <NameRevealContainer>
          <RevealOnScroll>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1e40af', marginBottom: '2rem' }}>
              The Story Behind Our Name
            </h2>
          </RevealOnScroll>
          
          <NameEquation>
            <NamePart className={nameRevealed ? 'typing robinson' : ''}>
              Robinson
            </NamePart>
            <PlusSign>+</PlusSign>
            <NamePart className={nameRevealed ? 'typing telecom' : ''}>
              Telecommunication
            </NamePart>
            <EqualsSign>=</EqualsSign>
            <NamePart className={nameRevealed ? 'typing robitel' : ''}>
              Robitel
            </NamePart>
          </NameEquation>
          
          <Tagline>
            A name inspired by survival, built on innovation.
          </Tagline>
        </NameRevealContainer>
      </NameRevealSection>

      {/* Timeline Section */}
      <TimelineSection>
        <TimelineContainer>
          <RevealOnScroll>
            <TimelineTitle>Our Journey Through Time</TimelineTitle>
          </RevealOnScroll>
          
          <Timeline>
            {timelineData.map((item, index) => (
              <RevealOnScroll key={item.year} delay={index * 200}>
                <TimelineItem>
                  <TimelineIcon></TimelineIcon>
                  <TimelineContent>
                    <TimelineYear>{item.year} — {item.title}</TimelineYear>
                    <TimelineDescription>{item.description}</TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
              </RevealOnScroll>
            ))}
          </Timeline>
        </TimelineContainer>
      </TimelineSection>

      {/* Split Screen Story Section */}
      <SplitScreenSection>
        <SplitPane className="crusoe">
          <RevealOnScroll>
            <SplitTitle>🏝️ The Challenge</SplitTitle>
            <SplitContent>
              <p><strong>Stranded on an island</strong>, Robinson Crusoe faced the ultimate test of survival. With limited resources and no outside help, he had to:</p>
              <ul style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                <li>• Adapt to an unfamiliar environment</li>
                <li>• Create solutions from scratch</li>
                <li>• Build sustainable systems</li>
                <li>• Never give up despite setbacks</li>
              </ul>
            </SplitContent>
          </RevealOnScroll>
          <ChallengeArrow>→</ChallengeArrow>
        </SplitPane>
        
        <SplitPane className="robitel">
          <RevealOnScroll delay={300}>
            <SplitTitle>📡 The Solution</SplitTitle>
            <SplitContent>
              <p><strong>In the telecommunications industry</strong>, companies face similar challenges. Robitel Group provides the same innovative spirit:</p>
              <ul style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                <li>• Skilled technicians ready for any challenge</li>
                <li>• Custom dashboard and KPI solutions</li>
                <li>• Sustainable training programs</li>
                <li>• Continuous innovation and support</li>
              </ul>
            </SplitContent>
          </RevealOnScroll>
        </SplitPane>
      </SplitScreenSection>

      {/* Quote Section */}
      <QuoteSection>
        <QuoteContainer>
          <RevealOnScroll>
            <QuoteText>
              It is never too late to be wise.
            </QuoteText>
            <QuoteAuthor>— Daniel Defoe, Robinson Crusoe</QuoteAuthor>
          </RevealOnScroll>
        </QuoteContainer>
      </QuoteSection>

      {/* Call to Action Section */}
      <CTASection>
        <RevealOnScroll>
          <CTATitle>Shaping the Future of Telecommunications</CTATitle>
          <p style={{ fontSize: '1.3rem', marginBottom: '3rem', opacity: '0.9' }}>
            Ready to discover how our innovative approach can transform your telecommunications operations?
          </p>
          <CTAButton onClick={() => navigate('/services')}>
            Explore Our Services
          </CTAButton>
        </RevealOnScroll>
      </CTASection>
    </PageContainer>
  );
};

export default History;
