import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 0 2rem; /* hero sits flush to top */
`;

/* What We Do section styles */
const WhatWeDoBlock = styled.section`
  background: transparent; /* remove green tint */
  border: none; /* remove border */
  border-radius: 0;
  padding: 0; /* no extra padding around items */
  box-shadow: none; /* remove shadow */
`;

const WhatWeDoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* space between banners */
  margin-top: 0.5rem;
`;

/* Full-bleed wrapper to make a child span entire viewport width */
const FullBleed = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
`;

const WhatWeDoItem = styled.div`
  position: relative;
  height: 320px; /* explicit height so inner 100% sizing works */
  padding: 0.5rem; /* space so image doesn't hug block edges */

  @media (max-width: 900px) {
    height: 260px;
  }
`;

/* Text overlay placed on top of image, aligned to a side */
const WhatWeDoOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  /* Fill the side opposite the image */
  ${({ $imageLeft }) =>
    $imageLeft
      ? 'left: calc(0.5rem + 56%); right: 0.5rem;'
      : 'left: 0.5rem; right: calc(0.5rem + 56%);'}
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1.25rem 1.5rem;
  z-index: 2; /* above image and gradient */

  /* text sits on colored panel */
  > div { max-width: 720px; }
  h3, p {
    color: #ffffff;
    text-shadow: 0 2px 8px rgba(0,0,0,0.25);
    text-align: left;
  }
`;

const WhatWeDoImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  border: none; /* border handled by wrapper */
  background: transparent; /* avoid any light edge showing through */
  display: block;
  object-fit: cover; /* fill column while preserving aspect */
`;

/* Image wrapper for the banner's image side */
const WhatWeDoImageWrap = styled.div`
  position: absolute;
  /* occupy only the image side to leave clear space for text */
  top: 0.5rem;
  bottom: 0.5rem;
  ${({ $fromLeft }) => ($fromLeft ? 'left: 0.5rem; right: auto;' : 'right: 0.5rem; left: auto;')}
  width: 56%; /* smaller image footprint on its side */
  border-radius: 12px;
  border: none; /* remove border from the image */
  overflow: hidden;
  z-index: 0; /* keep under gradient */

  /* ensure inner image fills container */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

/* Full banner backdrop: transparent over image, solid tint where text sits */
const BannerBackdrop = styled.div`
  position: absolute;
  top: 0.5rem;
  bottom: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
  border-radius: 12px;
  overflow: hidden;
  border: none; /* remove outer border for cleaner blend */
  z-index: 1; /* above image, below text */

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: ${({ $imageLeft }) =>
      $imageLeft
        ? "linear-gradient(to left, rgba(53,36,240,1) 0%, rgba(53,36,240,1) 46%, rgba(53,36,240,0.44) 52%, rgba(53,36,240,0.32) 58%, rgba(53,36,240,0.22) 66%, rgba(53,36,240,0.12) 74%, rgba(53,36,240,0.06) 84%, rgba(53,36,240,0.00) 92%)"
        : "linear-gradient(to right, rgba(53,36,240,1) 0%, rgba(53,36,240,1) 46%, rgba(53,36,240,0.44) 52%, rgba(53,36,240,0.32) 58%, rgba(53,36,240,0.22) 66%, rgba(53,36,240,0.12) 74%, rgba(53,36,240,0.06) 84%, rgba(53,36,240,0.00) 92%)"};
  }
`;

const WhatWeDoCard = styled.div`
  background: var(--primary-white);
  border: 1px solid rgba(53, 36, 240, 0.25);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 14px rgba(0,0,0,0.04);
  height: 100%; /* fill available column height */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 1.5rem auto 0; /* space below hero */
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  color: var(--deep-purple);
`;

const FeatureRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4rem;
  gap: 2rem;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextColumn = styled.div`
  flex: 1;
  max-width: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
  }
`;

const ImageColumn = styled.div`
  flex: 1;
  max-width: 50%;

  img {
    width: 100%;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 0.35rem;
  color: var(--deep-purple);
  text-align: center;
  margin-top: 0; /* keep title closer to top */
  line-height: 1.25;
  min-height: 3.2rem; /* tighter, still aligns description start */
`;

const FeatureText = styled.p`
  color: var(--text-color);
  opacity: 0.8;
  line-height: 1.5;
  text-align: center;
  margin-top: 0.2rem;
`;

const SectionBlock = styled.div`
  margin-bottom: 2rem;
`;

// Scroll reveal wrapper
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

const Card = styled.div`
  background: var(--primary-white);
  border: 1px solid var(--aqua);
  border-radius: 12px;
  padding: 1.5rem;
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

/* New: Hero banner for About page */
const AboutHero = styled.section`
  background: transparent; /* remove box */
  border: none; /* remove border */
  border-radius: 0;
  padding: 0; /* no inner padding */
  margin: clamp(5rem, 8vw, 10rem) auto 1rem; /* keep top gap, tighter below */
`;

const HeroHeading = styled.h1`
  font-size: clamp(2.75rem, 6vw, 4.75rem); /* much bigger */
  color: var(--deep-purple);
  margin: 0; /* no extra spacing inside */
  text-transform: uppercase; /* caps */
  letter-spacing: 0.04em; /* subtle tracking for readability */
  text-align: center;
`;

const HeroSubheading = styled.p`
  font-size: 1.1rem;
  color: rgba(0,0,0,0.75);
  line-height: 1.65;
  margin: 0;
`;

/* Section heading styled to match the hero heading size */
const SectionHeading = styled.h2`
  font-size: clamp(2.75rem, 6vw, 4.75rem);
  color: var(--deep-purple);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-align: center;
`;

/* New: Two-column intro */
const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.25rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Col = styled.div``;

const ImagePlaceholder = styled.div`
  height: 260px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(53,36,240,0.12), rgba(103,232,249,0.2));
  border: 1px dashed rgba(53,36,240,0.35);
`;

const AboutImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 14px;
  border: 1px solid rgba(53, 36, 240, 0.15);
  background: #f8fbff;
  display: block;
`;

/* New: Stats row */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 1.5rem 0 0.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: var(--primary-white);
  border: 1px solid rgba(103, 232, 249, 0.9);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 14px rgba(0,0,0,0.04);
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--deep-purple);
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: rgba(0,0,0,0.7);
`;

/* New: Values grid */
const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 3rem; /* increased spacing below the grid */
  align-items: stretch; /* ensure items stretch to equal height */
  grid-auto-rows: 1fr; /* make rows uniform height */

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  background: var(--primary-white);
  border: 1px solid var(--aqua);
  border-radius: 12px;
  padding: 0.4rem 0.65rem 0.65rem; /* decreased height further */
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
  height: 100%; /* fill grid cell height */
  margin-bottom: 1rem; /* extra spacing under cards */
  text-align: center; /* center text inside cards */
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  will-change: transform, box-shadow;

  /* Make inner wrapper fill and stack title + text consistently */
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* title reserved space + description starts aligned */
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 22px rgba(0,0,0,0.07);
    border-color: var(--teal);
  }
  &:focus-within {
    outline: 3px solid rgba(20, 184, 166, 0.35);
    outline-offset: 2px;
  }
`;

 


const About = () => {
  return (
    <AboutContainer className="about-container">
      <RevealOnScroll>
        <AboutHero>
          <HeroHeading>ABOUT US</HeroHeading>
        </AboutHero>
      </RevealOnScroll>
      <ContentWrapper className="about-wrapper">

        <SectionBlock>
          <RevealOnScroll>
            <FullBleed>
              <WhatWeDoItem>
                <BannerBackdrop $imageLeft={true} />
                <WhatWeDoImageWrap $fromLeft>
                  <WhatWeDoImage src="/images/about-graphic.png" alt="Qualified students to telecommunication workforce gap graphic" loading="lazy" />
                </WhatWeDoImageWrap>
                <WhatWeDoOverlay $imageLeft={true}>
                  <div>
                    <FeatureTitle>Who We Are</FeatureTitle>
                    <FeatureText>
                      Robitel Group is a telecommunications service and consulting group dedicated to delivering skilled talent and data-driven insights to meet the evolving needs of the telecom industry. We specialize in providing highly trained STEM professionals and creating tools that help companies monitor performance, improve operations, and enhance customer satisfaction.
                    </FeatureText>
                  </div>
                </WhatWeDoOverlay>
              </WhatWeDoItem>
            </FullBleed>
          </RevealOnScroll>
        </SectionBlock>

        <SectionBlock>
          <RevealOnScroll>
            <WhatWeDoBlock>
              <SectionHeading>WHAT WE DO</SectionHeading>
              <WhatWeDoGrid>
                <FullBleed>
                  <WhatWeDoItem>
                    <BannerBackdrop $imageLeft={false} />
                    <WhatWeDoImageWrap $fromLeft={false}>
                      <WhatWeDoImage src="/images/qualified-workforce.png" alt="Qualified telecom workforce" loading="lazy" />
                    </WhatWeDoImageWrap>
                    <WhatWeDoOverlay $imageLeft={false}>
                      <div>
                        <FeatureTitle>Qualified Workforce</FeatureTitle>
                        <FeatureText>
                          Through partnerships with universities and campus organizations, Robitel Group trains and certifies STEM
                          students, ensuring a steady pipeline of professionals equipped with the technical skills and industry
                          readiness to contribute from day one.
                        </FeatureText>
                      </div>
                    </WhatWeDoOverlay>
                  </WhatWeDoItem>
                </FullBleed>

                <FullBleed>
                  <WhatWeDoItem>
                    <BannerBackdrop $imageLeft={true} />
                    <WhatWeDoImageWrap $fromLeft>
                      <WhatWeDoImage src="/images/service-quality.png" alt="Service quality monitoring and feedback" loading="lazy" />
                    </WhatWeDoImageWrap>
                    <WhatWeDoOverlay $imageLeft={true}>
                      <div>
                        <FeatureTitle>Service Quality Monitoring</FeatureTitle>
                        <FeatureText>
                          We provide simple tools to capture customer feedback for each service, allowing companies to gather
                          insights easily and act promptly to improve the customer experience.
                        </FeatureText>
                      </div>
                    </WhatWeDoOverlay>
                  </WhatWeDoItem>
                </FullBleed>
              </WhatWeDoGrid>
            </WhatWeDoBlock>
          </RevealOnScroll>
        </SectionBlock>
        <SectionBlock>
          <ValuesGrid>
            <RevealOnScroll>
              <ValueCard>
                <div>
                  <FeatureTitle>Why We’re Different</FeatureTitle>
                  <FeatureText>
                    Talent development paired with practical solutions for measurable results and quality service.
                  </FeatureText>
                </div>
              </ValueCard>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <ValueCard>
                <div>
                  <FeatureTitle>Quality & Reliability</FeatureTitle>
                  <FeatureText>
                    Consistent standards and verified skill paths that keep teams aligned and accountable.
                  </FeatureText>
                </div>
              </ValueCard>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <ValueCard>
                <div>
                  <FeatureTitle>Actionable Insights</FeatureTitle>
                  <FeatureText>
                    Clear reporting and feedback loops make service performance visible so leaders can take timely action.
                  </FeatureText>
                </div>
              </ValueCard>
            </RevealOnScroll>
          </ValuesGrid>
        </SectionBlock>

        <SectionBlock>
          <RevealOnScroll>
            <Card className="about-card">
              <FeatureTitle>Our Commitment</FeatureTitle>
              <FeatureText>
                Robitel Group is committed to delivering value through skilled professionals and intelligent solutions that empower telecommunications companies to operate at their best. Our approach bridges the gap between education and industry, ensuring the next generation of talent is ready to meet real-world challenges while helping our clients succeed.
              </FeatureText>
            </Card>
          </RevealOnScroll>
        </SectionBlock>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;
