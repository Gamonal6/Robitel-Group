import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ServicesContainer = styled.div`
  padding: 4rem 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

// Scroll reveal
const Reveal = styled.div`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: translateY(${({ visible }) => (visible ? '0' : '12px')});
  transition: opacity 500ms ease, transform 500ms ease;
  will-change: opacity, transform;
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
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
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

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.25rem;
  color: var(--deep-purple);
  text-align: center;
`;

const IntroText = styled.p`
  color: var(--text-color);
  opacity: 0.85;
  line-height: 1.7;
  font-size: 1.0625rem;
  text-align: center;
  margin: 0 auto 1.5rem;
  max-width: 820px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const ServiceCard = styled.div`
  background-color: var(--primary-white);
  border: 1px solid var(--aqua);
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  will-change: transform, box-shadow;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.08);
    border-color: var(--teal);
  }

  &:focus-within {
    outline: 3px solid rgba(20, 184, 166, 0.35);
    outline-offset: 2px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: clamp(1.5rem, 2.2vw, 1.75rem);
  margin: 0 0 0.5rem 0;
  color: var(--deep-purple);
`;

const ServiceParagraph = styled.p`
  color: rgba(0,0,0,0.75);
  line-height: 1.7;
  font-size: 1.0625rem;
  margin: 0 0 0.5rem 0;
`;

const BulletList = styled.ul`
  margin: 0.25rem 0 0.5rem;
  padding-left: 1.25rem;
`;

const BulletItem = styled.li`
  list-style: none;
  position: relative;
  margin: 0.4rem 0;
  color: rgba(0,0,0,0.75);
  line-height: 1.7;
  font-size: 1.0625rem;

  &::before {
    content: '';
    position: absolute;
    left: -1.25rem;
    top: 0.72em;
    width: 7px;
    height: 7px;
    background: var(--teal);
    border-radius: 50%;
  }
`;

const Services = () => {
  return (
    <ServicesContainer>
      <ContentWrapper>
        <RevealOnScroll>
          <SectionTitle>Our Services</SectionTitle>
        </RevealOnScroll>
        <RevealOnScroll delay={80}>
          <IntroText>
            At Robitel Group, we provide skilled telecommunications professionals and practical service solutions
            designed to help companies operate efficiently and improve customer satisfaction.
          </IntroText>
        </RevealOnScroll>

        <ServicesGrid>
          <RevealOnScroll>
            <ServiceCard>
              <ServiceTitle>1. Workforce Solutions: Skilled Technicians</ServiceTitle>
              <ServiceParagraph>
                We supply highly trained STEM professionals who are ready to contribute from day one. Through partnerships with
                universities and campus organizations, students receive rigorous technical training and certifications, creating a
                reliable talent pipeline for the telecommunications market. This ensures your projects are staffed with capable,
                knowledgeable technicians who deliver results.
              </ServiceParagraph>
            </ServiceCard>
          </RevealOnScroll>

          <RevealOnScroll delay={180}>
            <ServiceCard>
              <ServiceTitle>2. Customer Satisfaction Monitoring</ServiceTitle>
              <ServiceParagraph>
                Our services also include tools to capture customer feedback for each service delivered. With easy-to-use feedback
                forms, companies can track customer satisfaction, identify areas for improvement, and ensure high-quality service consistently.
              </ServiceParagraph>
            </ServiceCard>
          </RevealOnScroll>

          <RevealOnScroll delay={260}>
            <ServiceCard>
              <ServiceTitle>Why Choose Robitel Group</ServiceTitle>
              <BulletList>
                <BulletItem>
                  <strong>Highly Qualified Workforce:</strong> Access a pipeline of STEM-trained, certified professionals.
                </BulletItem>
                <BulletItem>
                  <strong>Clear Standards:</strong> Make strategic decisions with clear, measurable performance expectations.
                </BulletItem>
                <BulletItem>
                  <strong>Customer Focus:</strong> Easily capture feedback to continuously improve service quality.
                </BulletItem>
                <BulletItem>
                  <strong>Optimized Planning:</strong> Reduce errors and improve service delivery through intelligent dispatching.
                </BulletItem>
              </BulletList>
              <ServiceParagraph>
                Our services are designed to combine talent, technology, and innovation, giving your company a competitive edge in the telecommunications industry.
              </ServiceParagraph>
            </ServiceCard>
          </RevealOnScroll>
        </ServicesGrid>
      </ContentWrapper>
    </ServicesContainer>
  );
};

export default Services;
