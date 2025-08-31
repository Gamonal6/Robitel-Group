import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MeetingContainer = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  background-color: #f8f9fa; // A light background for the page
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--deep-purple);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-color);
  opacity: 0.9;
  margin-bottom: 2rem;
`;

const CalendlyWrapper = styled.div`
  min-width: 320px;
  height: 800px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
`;

const ScheduleMeeting = () => {
  const calendlyUrl = 'https://calendly.com/henriquegamonal6/30min';
  const containerRef = useRef(null);

  useEffect(() => {
    let retries = 0;
    const maxRetries = 20;
    const interval = 200;

    const tryInit = () => {
      if (window.Calendly && typeof window.Calendly.initInlineWidget === 'function' && containerRef.current) {
        containerRef.current.innerHTML = '';
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: containerRef.current,
          prefill: {},
          utm: {},
        });
        return true;
      }
      return false;
    };

    if (!tryInit()) {
      const id = setInterval(() => {
        retries += 1;
        if (tryInit() || retries >= maxRetries) clearInterval(id);
      }, interval);
      return () => clearInterval(id);
    }
  }, [calendlyUrl]);

  return (
    <MeetingContainer>
      <Title>Schedule a Meeting</Title>
      <Subtitle>Use the scheduler below to book a 30-minute meeting.</Subtitle>
      <CalendlyWrapper ref={containerRef} />
    </MeetingContainer>
  );
};

export default ScheduleMeeting;
