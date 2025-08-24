import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const ServicesContainer = styled.div`
  /* Offset for fixed navbar to standardize hero distance */
  padding: 4.5rem 2rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

/* (Removed SectionShell background to restore previous clean layout) */

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

/* (Removed TitleWrap/SectionTitle/CableUnderline/Tagline to restore original hero title) */

const IntroText = styled.p`
  color: rgba(0,0,0,0.75);
  line-height: 1.7;
  font-size: 1.0625rem;
  text-align: center;
  margin: 0.25rem auto 2rem;
  max-width: 820px;
`;

const ServicesGrid = styled.div`
  position: relative;
  z-index: 0; /* establish stacking context for behind-line */
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 4vw, 2.5rem);

  /* centered, solid connector line behind cards */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    background: linear-gradient(180deg, #2563eb, #06b6d4); /* solid, non-transparent */
    box-shadow: 0 0 8px rgba(6, 182, 212, 0.3);
    border-radius: 999px;
    pointer-events: none;
    z-index: -1; /* behind the cards */
  }
`;

/* Icon bullet list variant (no custom dots, supports emoji/icon prefixes) */
const IconBulletList = styled.ul`
  margin: 0.35rem 0 0.5rem;
  padding-left: 0;

  li {
    list-style: none;
    margin: 0.45rem 0;
    color: rgba(0,0,0,0.8);
    line-height: 1.7;
    font-size: 1.0625rem;
  }
`;

const ListHeading = styled.div`
  font-weight: 700;
  color: var(--deep-purple);
  margin: 0.35rem 0 0.25rem;
`;

const ServiceCard = styled.article`
  position: relative;
  padding: clamp(1.25rem, 3.5vw, 2rem);
  border-radius: 16px;
  background: #ffffff; /* opaque so center line won't show through */
  backdrop-filter: saturate(1.2) blur(10px);
  -webkit-backdrop-filter: saturate(1.2) blur(10px);
  overflow: hidden;
  z-index: 0;
  box-shadow: 0 10px 28px rgba(0,0,0,0.06);
  transition: transform 220ms ease, box-shadow 220ms ease;
  will-change: transform, box-shadow;

  /* gradient border */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px; /* border thickness */
    background: linear-gradient(135deg, #2563eb, #6366f1, #06b6d4);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
  }

  /* subtle diagonal accent */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(37,99,235,0.06), rgba(6,182,212,0.04));
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 32px rgba(0,0,0,0.10);
  }

  &:focus-within {
    outline: 3px solid rgba(56, 189, 248, 0.35);
    outline-offset: 2px;
  }
`;

/* Two-column internal layout */
const CardLayout = styled.div`
  display: grid;
  grid-template-columns: 0.24fr 0.76fr; /* ~24% / 76% */
  gap: clamp(0.6rem, 2vw, 1rem);
  position: relative;
  z-index: 1; /* ensure content is above gradient border mask */

  @media (max-width: 699px) {
    grid-template-columns: 1fr;
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start; /* title acts as anchor at top-left */
  gap: 0.45rem;
`;

const RightCol = styled.div`
  align-self: start; /* align top */
`;

const NumberPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(28px, 3.2vw, 36px);
  height: clamp(28px, 3.2vw, 36px);
  border-radius: 999px;
  font-weight: 800;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  color: white;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  box-shadow: 0 6px 14px rgba(56,189,248,0.35);
`;

const CardIcon = styled.span`
  font-size: clamp(1.45rem, 2.2vw, 1.8rem);
  opacity: 0.95;
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
  font-size: clamp(1.35rem, 2.4vw, 1.65rem);
  margin: 0 0 0.35rem 0;
  background: linear-gradient(90deg, #4338ca, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: left;
  line-height: 1.15;
`;

const ServiceParagraph = styled.p`
  color: rgba(0,0,0,0.75);
  line-height: 1.7;
  font-size: 1.0625rem;
  margin: 0 0 0.5rem 0;
`;

const ResultLine = styled.p`
  margin: 0.35rem 0 0.5rem;
  color: rgba(0,0,0,0.86);
  font-size: 1.05rem;
  font-weight: 600;
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
    left: -1.2rem;
    top: 0.7em;
    width: 6px;
    height: 6px;
    background: linear-gradient(135deg, #2563eb, #06b6d4);
    border-radius: 999px;
  }
`;

/* === Advantage Wrap-Up Banner (full-bleed) === */
const AdvantageBanner = styled.section`
  position: relative;
  margin: clamp(2rem, 6vw, 3rem) 0 0;
  /* Full-bleed */
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  color: #ffffff;
`;

const AdvantageInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4.5vw, 3rem) clamp(1rem, 3vw, 2rem);
  text-align: center;
`;

const AdvantageTitle = styled.h2`
  margin: 0 0 0.75rem 0;
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  color: #ffffff;
  letter-spacing: 0.02em;
`;

const AdvantageIntro = styled.p`
  margin: 0.15rem auto 1.1rem;
  max-width: 820px;
  color: rgba(255,255,255,0.92);
  line-height: 1.7;
  font-size: clamp(1rem, 2.2vw, 1.1rem);
`;

const AdvantageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem auto 1.25rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem 1.25rem;
  max-width: 980px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const AdvantageItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #ffffff;
  line-height: 1.7;
  font-size: 1.02rem;
`;

const AdvantageIcon = styled.span`
  flex: 0 0 auto;
  opacity: 0.95;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  padding: 0.7rem 1.1rem;
  background: #ffffff;
  color: #0ea5b7;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,0.18); }
`;

/* === Roadmap / Timeline Section === */
const RoadmapSection = styled.section`
  margin: clamp(2rem, 6vw, 3rem) 0 0;
`;

const RoadmapTitle = styled.h2`
  text-align: center;
  font-size: clamp(1.8rem, 4.5vw, 2.4rem);
  margin: 0 0 1rem 0;
  background: linear-gradient(90deg, #2563eb, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Timeline = styled.div`
  position: relative;
  padding: 1rem 0 0.5rem;
`;

/* Glowing fiber cable track */
const TimelineTrack = styled.div`
  position: absolute;
  top: 54px; /* aligns with icon circles */
  left: 0;
  right: 0;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(to right, #06b6d4, #6366f1, #2563eb);
  background-size: 100% 100%;
  box-shadow: 0 0 12px rgba(56,189,248,0.35);
  overflow: hidden; /* clip shimmer */

  /* Left-to-right shimmer overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -30%;
    height: 100%;
    width: 30%;
    background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%);
    filter: blur(0.5px);
    opacity: 0.85;
    animation: ${keyframes`
      0% { transform: translateX(0%); }
      100% { transform: translateX(430%); }
    `} 3800ms linear infinite;
  }

  /* Vertical on small screens */
  @media (max-width: 799px) {
    left: 28px;
    width: 3px;
    height: calc(100% - 16px);
    top: 16px;
    right: auto;
    /* Hide shimmer when vertical to avoid odd direction */
    &::before { display: none; }
  }
`;

const StepList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    align-items: flex-start;
    gap: 0.9rem;
  }
`;

const StepItem = styled.li`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  @media (min-width: 800px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const IconCircle = styled.span`
  flex: 0 0 auto;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
  background: radial-gradient(circle at 30% 30%, rgba(99,102,241,0.18), rgba(6,182,212,0.18)), linear-gradient(135deg, #2563eb, #06b6d4);
  color: white;
  box-shadow: 0 10px 22px rgba(0,0,0,0.08), 0 0 0 4px rgba(56,189,248,0.18) inset;
`;

const StepText = styled.div`
  max-width: 220px;
`;

const StepLabel = styled.div`
  font-weight: 700;
  color: var(--deep-purple);
  margin-bottom: 0.2rem;
`;

const StepSub = styled.div`
  color: rgba(0,0,0,0.7);
  font-size: 0.98rem;
  line-height: 1.5;
`;

const RoadmapExplanation = styled.p`
  color: rgba(0,0,0,0.75);
  line-height: 1.6;
  font-size: 1.02rem;
  text-align: center;
  margin: 0.65rem auto 1.75rem;
  max-width: 880px;
`;

const PromiseBlock = styled.p`
  color: rgba(0,0,0,0.84);
  line-height: 1.65;
  font-size: clamp(1.05rem, 2.2vw, 1.2rem);
  text-align: center;
  margin: 0.25rem auto 1.35rem;
  max-width: 960px;
  font-weight: 600;
`;

const CardTagline = styled.div`
  font-size: 1.05rem; /* slightly larger than body */
  font-weight: 600;
  color: rgba(0,0,0,0.82); /* dark slate */
  margin: 0 0 0.5rem;
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
            At Robitel Group, we deliver modern telecommunications services backed by skilled people and practical tools
            that help you operate efficiently and delight customers.
          </IntroText>
        </RevealOnScroll>

        {/* Roadmap / Timeline */}
        <RoadmapSection>
          <RoadmapTitle>Our Technicians Journey</RoadmapTitle>
          <Timeline>
            <TimelineTrack aria-hidden="true" />
            <StepList>
              <RevealOnScroll>
                <StepItem>
                  <IconCircle aria-hidden="true">🎓</IconCircle>
                  <StepText>
                    <StepLabel>University Students</StepLabel>
                    <StepSub>Recruit from STEM universities.</StepSub>
                  </StepText>
                </StepItem>
              </RevealOnScroll>
              <RevealOnScroll delay={80}>
                <StepItem>
                  <IconCircle aria-hidden="true">📘</IconCircle>
                  <StepText>
                    <StepLabel>Training</StepLabel>
                    <StepSub>Intensive technical training.</StepSub>
                  </StepText>
                </StepItem>
              </RevealOnScroll>
              <RevealOnScroll delay={140}>
                <StepItem>
                  <IconCircle aria-hidden="true">✅</IconCircle>
                  <StepText>
                    <StepLabel>Certification</StepLabel>
                    <StepSub>Industry-standard certifications.</StepSub>
                  </StepText>
                </StepItem>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <StepItem>
                  <IconCircle aria-hidden="true">💬</IconCircle>
                  <StepText>
                    <StepLabel>Customer Service Training</StepLabel>
                    <StepSub>Soft skills & client communication.</StepSub>
                  </StepText>
                </StepItem>
              </RevealOnScroll>
              <RevealOnScroll delay={260}>
                <StepItem>
                  <IconCircle aria-hidden="true">👥</IconCircle>
                  <StepText>
                    <StepLabel>Shadowing</StepLabel>
                    <StepSub>Hands-on field experience.</StepSub>
                  </StepText>
                </StepItem>
              </RevealOnScroll>
              <RevealOnScroll delay={320}>
                <StepItem>
                  <IconCircle aria-hidden="true">⚡</IconCircle>
                  <StepText>
                    <StepLabel>Technician Ready</StepLabel>
                    <StepSub>Certified & ready to deploy.</StepSub>
                  </StepText>
                </StepItem>
              </RevealOnScroll>
            </StepList>
          </Timeline>
        </RoadmapSection>

        

        <RevealOnScroll delay={100}>
          <PromiseBlock>
            We help your telecom company scale their workforce, deliver exceptional service, and cut operational costs —
            all with certified, customer-ready technicians.
          </PromiseBlock>
        </RevealOnScroll>

        <ServicesGrid>
          <RevealOnScroll>
            <ServiceCard tabIndex="0">
              <CardLayout>
                <LeftCol>
                  <ServiceTitle>Skilled Technicians</ServiceTitle>
                </LeftCol>
                <RightCol>
                  <CardTagline>Certified Technicians, Ready When You Are.</CardTagline>
                  <ServiceParagraph>
                    We turn university STEM students into certified, customer‑ready technicians. Through training,
                    certification, and field shadowing, they gain the technical and customer service skills needed to
                    perform from day one.
                  </ServiceParagraph>
                  <ResultLine>➡️ The result: fast, reliable staffing for telecom companies without hiring delays or training costs.</ResultLine>
                </RightCol>
              </CardLayout>
            </ServiceCard>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <ServiceCard tabIndex="0">
              <CardLayout>
                <LeftCol>
                  <ServiceTitle>Customer Satisfaction Monitoring</ServiceTitle>
                </LeftCol>
                <RightCol>
                  <CardTagline>Every Job, Measured. Every Service, Improved.</CardTagline>
                  <ServiceParagraph>
                    Once in the field, our technicians don’t just complete jobs — they capture real‑time customer
                    feedback. This feedback loop allows telecom companies to spot trends, fix issues quickly, and
                    continually raise service quality.
                  </ServiceParagraph>
                  <ResultLine>➡️ The result: higher customer satisfaction and fewer repeat visits.</ResultLine>
                </RightCol>
              </CardLayout>
            </ServiceCard>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <ServiceCard tabIndex="0">
              <CardLayout>
                <LeftCol>
                  <ServiceTitle>Data & Performance Insights</ServiceTitle>
                </LeftCol>
                <RightCol>
                  <CardTagline>Turning Field Work Into Smart Decisions.</CardTagline>
                  <ServiceParagraph>
                    Each technician’s work generates valuable performance data. We help telecom companies use this data to
                    track KPIs, identify bottlenecks, and optimize operations.
                  </ServiceParagraph>
                  <ResultLine>➡️ The result: lower costs, greater efficiency, and continuous improvement.</ResultLine>
                </RightCol>
              </CardLayout>
            </ServiceCard>
          </RevealOnScroll>
        </ServicesGrid>

        {/* Advantage wrap-up banner */}
        <RevealOnScroll delay={120}>
          <AdvantageBanner>
            <AdvantageInner>
              <AdvantageTitle>The Robitel Advantage</AdvantageTitle>
              <AdvantageIntro>From student to certified technician, Robitel delivers a complete workforce solution.</AdvantageIntro>
              <AdvantageList>
                <AdvantageItem>
                  <AdvantageIcon aria-hidden="true">⚡</AdvantageIcon>
                  Technicians ready in days, not months
                </AdvantageItem>
                <AdvantageItem>
                  <AdvantageIcon aria-hidden="true">🛡</AdvantageIcon>
                  Certified in fiber, copper, and safety standards
                </AdvantageItem>
                <AdvantageItem>
                  <AdvantageIcon aria-hidden="true">🎧</AdvantageIcon>
                  Customer service training built into the process
                </AdvantageItem>
                <AdvantageItem>
                  <AdvantageIcon aria-hidden="true">📊</AdvantageIcon>
                  Real-time quality monitoring per job
                </AdvantageItem>
                <AdvantageItem>
                  <AdvantageIcon aria-hidden="true">🔍</AdvantageIcon>
                  Actionable performance insights for smarter operations
                </AdvantageItem>
                <AdvantageItem>
                  <AdvantageIcon aria-hidden="true">🔄</AdvantageIcon>
                  Flexible workforce models: surge, long-term, or project-based
                </AdvantageItem>
              </AdvantageList>
              <CTAButton to="/schedule">Schedule a Meeting</CTAButton>
            </AdvantageInner>
          </AdvantageBanner>
        </RevealOnScroll>
      </ContentWrapper>
    </ServicesContainer>
  );
};

export default Services;
