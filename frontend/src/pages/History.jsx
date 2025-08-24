import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const PageContainer = styled.div`
  /* Offset to clear fixed navbar while keeping hero compact */
  padding: 4.5rem 2rem 4rem;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const SectionTitle = styled.h1`
  font-size: clamp(2rem, 3.2vw, 2.5rem);
  color: var(--deep-purple);
  text-align: center;
  line-height: 1.1; /* tighter heading height */
  margin: 0 0 0.5rem 0; /* slightly reduced bottom spacing */
  /* When linked via hash, prevent being hidden beneath navbar */
  scroll-margin-top: 6rem;
`;

/* === Hero title styling (aligned with About/Services) === */
const HistoryHero = styled.section`
  margin: clamp(0.4rem, 1vw, 0.9rem) auto 0.5rem; /* close to top without clipping */
`;

const HeroSurface = styled.div`
  position: relative;
  padding: 0.3rem 0.8rem 0.9rem; /* bring heading closer to top, keep some bottom padding */
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
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
  font-size: clamp(1rem, 2vw, 1.2rem);
  opacity: 0.8;
  margin-bottom: -0.15rem;
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
  margin: 0.25rem auto 0; /* even closer to heading */
  border-radius: 3px;
  background: linear-gradient(90deg, var(--deep-purple), var(--aqua));
  background-size: 200% 100%;
  animation: ${waveShift} 1600ms linear infinite;
`;

const SubTitle = styled.h2`
  font-size: clamp(1.25rem, 2.2vw, 1.5rem);
  color: var(--deep-purple);
  line-height: 1.25; /* control subtitle height */
  margin: 1.25rem 0 0.5rem; /* balanced spacing around subtitle */
  scroll-margin-top: 6rem;
`;

const Paragraph = styled.p`
  color: rgba(0,0,0,0.8);
  line-height: 1.75;
  font-size: 1.0625rem;
  margin: 0 0 1rem 0;
`;

const Card = styled.section`
  background: var(--primary-white);
  border: 1px solid var(--aqua);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  will-change: transform, box-shadow;
  margin-bottom: 1rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 22px rgba(0,0,0,0.07);
    border-color: var(--teal);
  }
`;

// Scroll reveal (consistent with About/Services)
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

const History = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <RevealOnScroll>
          <HistoryHero>
            <HeroSurface>
              <IconRow aria-hidden="true">🎓 📡 🔧</IconRow>
              <HeroHeading>
                Our <Accent>History</Accent>
              </HeroHeading>
              <Underline aria-hidden="true" />
            </HeroSurface>
          </HistoryHero>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <SubTitle>Inspired by Resilience and Ingenuity</SubTitle>
        </RevealOnScroll>
        <RevealOnScroll delay={120}>
          <Card>
            <Paragraph>
              The story of Robinson Crusoe has always been a source of inspiration for us — a tale of resilience, resourcefulness, and determination in the face of unexpected challenges. Just as Crusoe navigated an unfamiliar island, relying on his skills and creativity to survive and thrive, Robitel Group was founded with the same entrepreneurial spirit: solving complex problems, creating solutions from limited resources, and building a company that lasts.
            </Paragraph>
            <Paragraph>
              The name Robitel reflects this inspiration: it is a combination of Robinson (from Robinson Crusoe) and Telecommunication, symbolizing our mission to bring resilience, ingenuity, and skilled talent to the telecom industry.
            </Paragraph>
          </Card>
        </RevealOnScroll>

        <RevealOnScroll delay={160}>
          <SubTitle>From Vision to Reality</SubTitle>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <Card>
            <Paragraph>
              Our journey began with a simple but ambitious idea: to bridge the gap between skilled talent and the telecommunications industry. We recognized an untapped potential — talented university students eager to apply their skills, yet lacking meaningful opportunities. Drawing inspiration from Crusoe’s adaptability, we designed a system to train, certify, and connect emerging professionals with companies in need of qualified technicians.
            </Paragraph>
          </Card>
        </RevealOnScroll>

        <RevealOnScroll delay={260}>
          <SubTitle>Building with Purpose</SubTitle>
        </RevealOnScroll>
        <RevealOnScroll delay={300}>
          <Card>
            <Paragraph>
              Like Crusoe building his life on the island, Robitel Group grew by combining technical expertise, creativity, and innovation. Today, we deliver highly trained technicians and practical service improvements that help companies improve operations and customer satisfaction.
            </Paragraph>
          </Card>
        </RevealOnScroll>

        <RevealOnScroll delay={360}>
          <SubTitle>Looking Ahead</SubTitle>
        </RevealOnScroll>
        <RevealOnScroll delay={400}>
          <Card>
            <Paragraph>
              The spirit of Robinson Crusoe continues to guide us: embracing challenges, thinking independently, and finding innovative ways to thrive. Robitel Group’s history is one of resilience, vision, and action — a foundation for a future where we continue to set the standard in telecommunications talent, service, and innovation.
            </Paragraph>
          </Card>
        </RevealOnScroll>
      </ContentWrapper>
    </PageContainer>
  );
};

export default History;
