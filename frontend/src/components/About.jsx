import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const AboutContainer = styled.div`
  /* Offset for fixed navbar to standardize hero distance */
  padding: 4.5rem 2rem 0;
`;

/* What We Do section styles */
const WhatWeDoBlock = styled.section`
  position: relative; /* enable decorative layers */
  background: transparent; /* keep content area clean */
  border: none;
  border-radius: 0;
  padding: 0; /* no extra padding around items */
  box-shadow: none;

  /* Faint telecom grid background */
  &::before {
    content: "";
    position: absolute;
    inset: -8px 0 -8px 0; /* extend slightly beyond */
    background-image:
      radial-gradient(circle at 12% 18%, rgba(88, 101, 242, 0.06) 0 1px, transparent 1px),
      radial-gradient(circle at 62% 74%, rgba(103, 232, 249, 0.06) 0 1px, transparent 1px),
      linear-gradient(to right, rgba(88, 101, 242, 0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(88, 101, 242, 0.06) 1px, transparent 1px);
    background-size: auto, auto, 48px 48px, 48px 48px;
    background-position: center;
    pointer-events: none;
    z-index: 0;
  }

  /* Angled divider at the top to separate sections */
  /* diagonal divider removed */
`;

const WhatWeDoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* space between banners */
  margin-top: 0.5rem;
`;

/* Split-styled heading: solid 'What' + gradient 'we do' with slide-in */
const slideInGlow = keyframes`
  0% { opacity: 0; transform: translateX(-14px); text-shadow: 0 0 0 rgba(88, 101, 242, 0); }
  100% { opacity: 1; transform: translateX(0); text-shadow: 0 0 12px rgba(88, 101, 242, 0.18); }
`;

const WhatHeading = styled.h2`
  position: relative;
  z-index: 1; /* above decorative layers */
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  margin: 0.25rem 0 0.35rem;
  text-align: center;
  letter-spacing: 0.02em;
  font-weight: 800;
  animation: ${slideInGlow} 720ms ease both;

  .solid {
    color: var(--deep-purple);
  }
  .gradient {
    background: linear-gradient(90deg, var(--aqua), var(--deep-purple));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

/* Animated signal-like underline beneath heading */
const waveShift = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const SignalUnderline = styled.div`
  position: relative;
  z-index: 1;
  height: 4px;
  width: 240px;
  margin: 0.25rem auto 0.65rem;
  border-radius: 4px;
  background: linear-gradient(90deg,
    rgba(88, 101, 242, 0.0),
    rgba(88, 101, 242, 0.85),
    rgba(103, 232, 249, 0.9),
    rgba(88, 101, 242, 0.85),
    rgba(88, 101, 242, 0.0)
  );
  background-size: 200% 100%;
  animation: ${waveShift} 1600ms linear infinite;
  box-shadow: 0 0 10px rgba(103, 232, 249, 0.35);
`;

/* Tagline under What We Do heading */
const WhatTagline = styled.p`
  position: relative;
  z-index: 1;
  margin: -0.15rem auto 0.6rem;
  text-align: center;
  color: var(--text-color);
  opacity: 0.72;
  max-width: 820px;
  line-height: 1.6;
  font-size: clamp(1rem, 2.2vw, 1.1rem);
`;

const WhatCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin: 0.2rem auto 0.8rem;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  text-decoration: none;
  background: rgba(88, 101, 242, 0.06);
  color: var(--deep-purple);
  font-weight: 700;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  transition: transform 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
  width: max-content;

  &:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08); background: rgba(88, 101, 242, 0.08); }
`;

/* Full-bleed wrapper to make a child span entire viewport width */
const FullBleed = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
`;

/* Full-bleed connected background band for the three banners */
const ConnectedBand = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  background: var(--primary-white, #ffffff); /* back to white */
  padding: 0; /* no added spacing */
`;

/* Contrasting full-bleed strip just for the 'What we do' heading */
const HeadingStrip = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  background: transparent; /* blend with page */
  padding: 0; /* no added spacing */
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
    color: var(--primary-white);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
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
        ? 'linear-gradient(to left, var(--deep-purple) 0%, var(--deep-purple) 46%, rgba(var(--deep-purple-rgb), 0.44) 52%, rgba(var(--deep-purple-rgb), 0.32) 58%, rgba(var(--deep-purple-rgb), 0.22) 66%, rgba(var(--deep-purple-rgb), 0.12) 74%, rgba(var(--deep-purple-rgb), 0.06) 84%, rgba(var(--deep-purple-rgb), 0) 92%)'
        : 'linear-gradient(to right, var(--deep-purple) 0%, var(--deep-purple) 46%, rgba(var(--deep-purple-rgb), 0.44) 52%, rgba(var(--deep-purple-rgb), 0.32) 58%, rgba(var(--deep-purple-rgb), 0.22) 66%, rgba(var(--deep-purple-rgb), 0.12) 74%, rgba(var(--deep-purple-rgb), 0.06) 84%, rgba(var(--deep-purple-rgb), 0) 92%)'};
  }
`;

const WhatWeDoCard = styled.div`
  background: var(--primary-white);
  border: 1px solid rgba(88, 101, 242, 0.15);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
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
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  will-change: transform, box-shadow;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    border-color: var(--teal);
  }

  &:focus-within {
    outline: 3px solid rgba(13, 202, 240, 0.35);
    outline-offset: 2px;
  }
`;

/* New: Hero banner for About page */
const AboutHero = styled.section`
  background: transparent; /* remove box */
  border: none; /* remove border */
  border-radius: 0;
  padding: 0; /* no inner padding */
  margin: clamp(0.4rem, 1vw, 0.9rem) auto 0.5rem; /* close to top without clipping */
`;

/* Decorative hero surface with gradient + subtle network grid */
const HeroSurface = styled.div`
  position: relative;
  padding: 0.3rem 0.8rem 0.9rem; /* bring heading closer to top, keep some bottom padding */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
  background-image:
    linear-gradient(135deg, rgba(88, 101, 242, 0.08), rgba(103, 232, 249, 0.1)),
    linear-gradient(to right, rgba(88, 101, 242, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(88, 101, 242, 0.08) 1px, transparent 1px);
  background-size: auto, 32px 32px, 32px 32px;
  background-position: center;
`;

/* Gradient accent for the word 'Us' */
const Accent = styled.span`
  background: linear-gradient(90deg, var(--deep-purple), var(--aqua));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

/* Animated underline that reveals left-to-right */
const revealLine = keyframes`
  from { width: 0; opacity: 0; }
  to { width: 140px; opacity: 1; }
`;

const Underline = styled.div`
  height: 3px;
  width: 140px; /* final width matches animation */
  margin: 0.25rem auto 0; /* even closer to heading */
  border-radius: 3px;
  background: linear-gradient(90deg, var(--deep-purple), var(--aqua));
  background-size: 200% 100%;
  /* First reveal the line, then start the infinite wave shift */
  animation: ${revealLine} 900ms ease forwards, ${waveShift} 1600ms linear infinite 900ms;
`;

/* Subtle icon row for context (STEM/Telecom/Tools) */
const IconRow = styled.div`
  display: flex;
  gap: 0.55rem;
  justify-content: center;
  align-items: center;
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  opacity: 0.85;
  margin-bottom: -0.25rem; /* pull icons closer to heading */
`;

/* Floating decorative tool icon */
const floatY = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-8px); }
`;

const FloatingIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 12px;
  opacity: 0.35;
  font-size: 1.25rem;
  animation: ${floatY} 3.5s ease-in-out infinite alternate;
  pointer-events: none;
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

const HeroSubheading = styled.p`
  font-size: 1.1rem;
  color: var(--text-color);
  opacity: 0.75;
  line-height: 1.65;
  margin: 0;
`;

/* Section heading styled to match the hero heading size */
const SectionHeading = styled.h2`
  font-size: clamp(2.75rem, 6vw, 4.75rem);
  color: var(--deep-purple);
  margin: 0 0 1rem 0;
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
  background: linear-gradient(135deg, rgba(88, 101, 242, 0.12), rgba(103, 232, 249, 0.2));
  border: 1px dashed rgba(88, 101, 242, 0.35);
`;

const AboutImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 14px;
  border: 1px solid rgba(88, 101, 242, 0.15);
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
  border: 1px solid rgba(241, 228, 209, 0.9);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--deep-purple);
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: var(--text-color);
  opacity: 0.7;
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
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.07);
    border-color: var(--teal);
  }
  &:focus-within {
    outline: 3px solid rgba(13, 202, 240, 0.35);
    outline-offset: 2px;
  }
`;

/* Why We're Different: icon + headline vertical card */
const WhyCard = styled.div`
  background: var(--primary-white);
  border-radius: 14px;
  padding: 1rem 0.9rem;
  text-align: center;
  border: 1px solid rgba(241, 228, 209, 0.95);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  will-change: transform, box-shadow;

  &:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08); border-color: var(--teal); }
  &:focus-within { outline: 3px solid rgba(13, 202, 240, 0.35); outline-offset: 2px; }
`;

const WhyIcon = styled.span`
  display: inline-grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  margin: 0 auto 0.45rem;
  background: radial-gradient(circle at 30% 30%, rgba(88, 101, 242, 0.18), rgba(13, 202, 240, 0.18)), linear-gradient(135deg, var(--bright-blue), var(--teal));
  color: var(--primary-white);
  font-size: 1.25rem;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08), 0 0 0 4px rgba(13, 202, 240, 0.18) inset;
`;

const WhyHeadline = styled.div`
  font-weight: 800;
  color: var(--deep-purple);
  margin-bottom: 0.25rem;
`;

const WhyText = styled.p`
  margin: 0;
  color: var(--text-color);
  opacity: 0.75;
  line-height: 1.6;
`;

/* Our Commitment Banner (full-bleed gradient) */
const CommitmentBanner = styled.section`
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  margin-top: clamp(1.5rem, 4vw, 2.5rem);
  background: linear-gradient(135deg, var(--bright-blue), var(--teal));
  color: var(--primary-white);
`;

const CommitmentInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: clamp(1.5rem, 4.5vw, 3rem) clamp(1rem, 3vw, 2rem);
  text-align: center;
`;

const CommitmentTitle = styled.h2`
  margin: 0 0 0.6rem 0;
  font-size: clamp(1.9rem, 5vw, 2.5rem);
  color: var(--primary-white);
`;

const CommitmentText = styled.p`
  margin: 0.1rem auto 1rem;
  max-width: 860px;
  color: var(--primary-white);
  opacity: 0.92;
  line-height: 1.7;
  font-size: clamp(1rem, 2.2vw, 1.1rem);
`;

const CommitmentCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.25rem;
  padding: 0.7rem 1.1rem;
  background: var(--primary-white);
  color: var(--teal);
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transition: transform 160ms ease, box-shadow 160ms ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18); }
`;

 


const About = () => {
  return (
    <AboutContainer className="about-container">
      <RevealOnScroll>
        <AboutHero>
          <HeroSurface>
            <IconRow aria-hidden="true">🎓 📡 🔧</IconRow>
            <HeroHeading>
              About <Accent>Us</Accent>
            </HeroHeading>
            <HeroSubheading>Where Education Meets Telecom Innovation</HeroSubheading>
            <Underline aria-hidden="true" />
            <FloatingIcon aria-hidden="true">🔧</FloatingIcon>
          </HeroSurface>
        </AboutHero>
      </RevealOnScroll>
      <ContentWrapper className="about-wrapper">
        <ConnectedBand>

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
              <WhatHeading>
                <span className="solid">What</span> <span className="gradient">we do</span>
              </WhatHeading>
              <SignalUnderline aria-hidden="true" />
              <WhatTagline>
                We develop certified telecom talent and simple tools that turn every job into measurable quality and insights.
              </WhatTagline>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <WhatCTA to="/services" aria-label="Explore our services">Explore our Services →</WhatCTA>
              </div>
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

        </ConnectedBand>
        <SectionBlock>
          <ValuesGrid>
            <RevealOnScroll>
              <WhyCard>
                <WhyIcon aria-hidden="true">🧭</WhyIcon>
                <WhyHeadline>Purpose-Built Talent</WhyHeadline>
                <WhyText>We recruit STEM students and coach them through certification to deliver job-ready technicians.</WhyText>
              </WhyCard>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <WhyCard>
                <WhyIcon aria-hidden="true">🛡</WhyIcon>
                <WhyHeadline>Quality You Can Measure</WhyHeadline>
                <WhyText>Every service captures feedback so you can see trends, fix issues, and raise satisfaction.</WhyText>
              </WhyCard>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <WhyCard>
                <WhyIcon aria-hidden="true">📊</WhyIcon>
                <WhyHeadline>Operational Insight</WhyHeadline>
                <WhyText>Turn field data into KPIs you can act on to reduce costs and improve performance.</WhyText>
              </WhyCard>
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

        {/* Bold commitment banner */}
        <RevealOnScroll delay={80}>
          <CommitmentBanner>
            <CommitmentInner>
              <CommitmentTitle>Bottom Line</CommitmentTitle>
              <CommitmentText>
                We build a reliable pipeline of certified technicians and the tools to measure every service, so your
                customers get exceptional outcomes—every time.
              </CommitmentText>
              <CommitmentCTA to="/schedule">Schedule a Meeting</CommitmentCTA>
            </CommitmentInner>
          </CommitmentBanner>
        </RevealOnScroll>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;
