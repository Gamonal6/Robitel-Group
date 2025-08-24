import React, { useEffect, useRef } from 'react';

const ScheduleMeeting = () => {
  const calendlyUrl = 'https://calendly.com/henriquegamonal6/30min';
  const containerRef = useRef(null);

  useEffect(() => {
    let retries = 0;
    const maxRetries = 20; // ~4s total if interval=200ms
    const interval = 200;

    const tryInit = () => {
      if (window.Calendly && typeof window.Calendly.initInlineWidget === 'function' && containerRef.current) {
        // Clear previous content (in case of hot reload/nav)
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
    <div>
      <h1>Schedule a Meeting</h1>
      <p style={{ color: '#6b7280' }}>Use the scheduler below to book a 30-minute meeting.</p>
      <div ref={containerRef} style={{ minWidth: '320px', height: 800 }} />
    </div>
  );
};

export default ScheduleMeeting;
