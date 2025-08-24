import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const ServicesContainer = styled.div`
  /* Offset for fixed navbar to standardize hero distance */
  padding: 4.5rem 2rem 0;
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

/* === Hero title styling (aligned with About page) === */
const ServicesHero = styled.section`
  margin: clamp(0.4rem, 1vw, 0.9rem) auto 0.5rem; /* close to top without clipping */
`;

const HeroSurface = styled.div`
  position: relative;
  padding: clamp(0.4rem, 1.8vw, 1rem) 0.8rem; /* tighter to reduce hero height */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(0,0,0,0.06);
  background-image:
    linear-gradient(135deg, rgba(53,36,240,0.08), rgba(103,232,249,0.10)),
    linear-gradient(to right, rgba(53,36,240,0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(53,36,240,0.08) 1px, transparent 1px);
  background-size: auto, 32px 32px, 32px 32px;
  background-position: center;
`;

const IconRow = styled.div`
  display: flex;
  gap: 0.55rem;
  justify-content: center;
  align-items: center;
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  opacity: 0.85;
  margin-bottom: -0.25rem; /* pull icons closer to heading */
`;

const Accent = styled.span`
  background: linear-gradient(90deg, var(--deep-purple), var(--aqua));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const slideInGlow = keyframes`
  0% { opacity: 0; transform: translateY(8px); text-shadow: 0 0 0 rgba(53,36,240,0); }
  100% { opacity: 1; transform: translateY(0); text-shadow: 0 0 12px rgba(53,36,240,0.18); }
`;

const HeroHeading = styled.h1`
  font-size: clamp(2.4rem, 6vw, 4.25rem);
  color: var(--deep-purple);
  margin: 0; /* no extra vertical space */
  letter-spacing: 0.03em; /* slightly tighter */
  line-height: 1.05; /* reduce height */
  text-align: center;
  animation: ${slideInGlow} 720ms ease both;
`;

const waveShift = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const Underline = styled.div`
  height: 3px;
  width: 140px;
  margin: 0.3rem auto 0; /* closer to heading */
  border-radius: 3px;
  background: linear-gradient(90deg, var(--deep-purple), var(--aqua));
  background-size: 200% 100%;
  animation: ${waveShift} 1600ms linear infinite;
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
          <ServicesHero>
            <HeroSurface>
              <IconRow aria-hidden="true">🎓 📡 🔧</IconRow>
              <HeroHeading>
                Our <Accent>Services</Accent>
              </HeroHeading>
              <Underline aria-hidden="true" />
            </HeroSurface>
          </ServicesHero>
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
