import React from 'react';
import styled, { css } from 'styled-components';

const ContactContainer = styled.div`
  padding: 4rem 2rem;
  text-align: center;
`;

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  display: block;
  padding: 1rem;
  padding-right: 2.5rem; /* space for asterisk */
  border-radius: 5px;
  border: 1px solid var(--bright-blue);
  background-color: var(--primary-white);
  color: var(--text-color);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  /* Gray placeholder-style appearance when invalid (i.e., value is "") */
  &:invalid {
    color: #aaa;
  }

  /* Ensure real options show normal text color */
  option {
    color: var(--text-color);
  }

  /* Keep the placeholder option gray */
  option[disabled] {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: var(--bright-blue);
    box-shadow: 0 0 0 3px rgba(78, 180, 242, 0.35);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--deep-purple);
`;

const SectionSubheading = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: var(--text-color);
  opacity: 0.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 720px;
  margin: 0 auto;
`;

// Two-column row for Name and Company
const TwoColumnRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// Wrapper to show a red asterisk for required fields
const Field = styled.div`
  position: relative;
  ${props => props.$required && css`
    &::after {
      content: "*";
      position: absolute;
      right: 8px;
      top: 6px;
      color: #e11d48; /* red */
      font-weight: 700;
      pointer-events: none;
    }
  `}
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  display: block;
  padding: 1rem;
  padding-right: 2.5rem; /* space for asterisk */
  border-radius: 5px;
  border: 1px solid var(--bright-blue);
  background-color: var(--primary-white);
  color: var(--text-color);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--bright-blue);
    box-shadow: 0 0 0 3px rgba(78, 180, 242, 0.35);
  }

  &::placeholder {
    color: #aaa;
    opacity: 0.6;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  display: block;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid var(--bright-blue);
  background-color: var(--primary-white);
  color: var(--text-color);
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--bright-blue);
    box-shadow: 0 0 0 3px rgba(78, 180, 242, 0.35);
  }

  &::placeholder {
    color: #aaa;
    opacity: 0.6;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--deep-purple);
  color: var(--primary-white);
  padding: 1rem 2rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.95;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;


const Contact = () => {
  return (
    <ContactContainer>
      <SectionTitle>Get in Touch</SectionTitle>
      <SectionSubheading>
        Let’s talk about staffing technicians or setting up customer feedback tools.
      </SectionSubheading>
      <ContactForm>
        <TwoColumnRow>
          <Field $required>
            <Input id="name" name="name" type="text" placeholder="Name" required />
          </Field>
          <Field $required>
            <Input id="company" name="company" type="text" placeholder="Company" required />
          </Field>
        </TwoColumnRow>
        <Field $required>
          <Input id="email" name="email" type="email" placeholder="Email" required />
        </Field>
        <Field $required>
          <Select id="reason" name="reason" required defaultValue="">
            <option value="" disabled>Reason for contact</option>
            <option value="general">General inquiry</option>
            <option value="staffing">Staffing technicians</option>
            <option value="feedback-tools">Customer feedback tools</option>
            <option value="partnership">Partnership</option>
            <option value="other">Other</option>
          </Select>
        </Field>
        <Textarea rows="5" placeholder="Your Message"></Textarea>
        <ButtonsRow>
          <SubmitButton type="submit">Send Message</SubmitButton>
        </ButtonsRow>
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact;
