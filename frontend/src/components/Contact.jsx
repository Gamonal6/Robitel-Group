import React from 'react';
import styled, { css } from 'styled-components';

// SVG Icons as components
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const ContactPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  background: #f8f9fa;
  min-height: calc(100vh - 80px); /* Adjust for navbar height */

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 2rem 1rem;
    min-height: auto;
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  background: var(--primary-white);
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  flex: 1.5;
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  background: linear-gradient(135deg, var(--deep-purple), var(--teal));
  color: var(--primary-white);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--deep-purple);
`;

const SectionSubheading = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #555;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TwoColumnRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  position: relative;
  ${props => props.$required && css`
    &::after {
      content: "*";
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--teal);
      font-weight: 700;
      pointer-events: none;
    }
  `}
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  color: var(--text-color);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  padding-right: ${props => props.required ? '2.5rem' : '1rem'};

  &:focus {
    outline: none;
    border-color: var(--deep-purple);
    box-shadow: 0 0 0 3px rgba(53, 36, 240, 0.2);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  color: var(--text-color);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  padding-right: 2.5rem;

  &:invalid {
    color: #aaa;
  }

  option {
    color: var(--text-color);
  }

  option[disabled] {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: var(--deep-purple);
    box-shadow: 0 0 0 3px rgba(53, 36, 240, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  color: var(--text-color);
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--deep-purple);
    box-shadow: 0 0 0 3px rgba(53, 36, 240, 0.2);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, var(--teal), var(--aqua));
  color: var(--primary-white);
  padding: 1rem 2rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  align-self: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const InfoTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;

  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2;
    flex-shrink: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;

  a {
    color: var(--primary-white);
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }

    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

const Contact = () => {
  return (
    <ContactPageContainer>
      <ContactWrapper>
        <FormContainer>
          <SectionTitle>Send Us a Message</SectionTitle>
          <SectionSubheading>
            We’re here to help. Fill out the form below and we’ll get back to you as soon as possible.
          </SectionSubheading>
          <ContactForm>
            <TwoColumnRow>
              <Field $required>
                <Input id="name" name="name" type="text" placeholder="Your Name" required />
              </Field>
              <Field $required>
                <Input id="company" name="company" type="text" placeholder="Company Name" required />
              </Field>
            </TwoColumnRow>
            <Field $required>
              <Input id="email" name="email" type="email" placeholder="Your Email" required />
            </Field>
            <Field $required>
              <Select id="reason" name="reason" required defaultValue="">
                <option value="" disabled>What can we help you with?</option>
                <option value="staffing">Staffing & Recruitment</option>
                <option value="feedback-tools">Customer Feedback Solutions</option>
                <option value="consulting">KPI & Dashboard Consulting</option>
                <option value="partnership">Partnership Opportunities</option>
                <option value="general">General Inquiry</option>
              </Select>
            </Field>
            <Textarea rows="5" placeholder="Tell us more about your needs..."></Textarea>
            <SubmitButton type="submit">Send Message</SubmitButton>
          </ContactForm>
        </FormContainer>
        <InfoContainer>
          <InfoTitle>Contact Information</InfoTitle>
          <InfoText>
            Reach out to us directly through any of the channels below. We look forward to connecting with you.
          </InfoText>
          <InfoBlock>
            <MailIcon />
            <span>contact@robitelgroup.com</span>
          </InfoBlock>
          <InfoBlock>
            <PhoneIcon />
            <span>(555) 123-4567</span>
          </InfoBlock>
        </InfoContainer>
      </ContactWrapper>
    </ContactPageContainer>
  );
};

export default Contact;
