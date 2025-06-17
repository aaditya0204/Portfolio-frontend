import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiGithub, FiInstagram } from 'react-icons/fi';
import axios from 'axios';

const ContactContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled(motion.h1)`
  margin-bottom: 1rem;
  text-align: center;
  
  span {
    color: ${({ theme }) => theme.primary};
  }
`;

const PageDescription = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled(motion.form)`
  background-color: ${({ theme }) => theme.card};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.primary};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  resize: vertical;
  min-height: 150px;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 0.8rem 2rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.card};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
`;

const ContactDetails = styled.div`
  flex: 1;
  
  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  p, a {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.card};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-5px);
  }
`;

const FormMessage = styled(motion.div)`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  text-align: center;
  background-color: ${({ success, theme }) => success ? theme.success + '20' : theme.error + '20'};
  color: ${({ success, theme }) => success ? theme.success : theme.error};
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send data to the server
      await axios.post('/api/contact', formData);
      
      setLoading(false);
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully! I will get back to you soon.',
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: '',
        });
      }, 5000);
    } catch (error) {
      setLoading(false);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Failed to send message. Please try again later.',
      });
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  
  return (
    <ContactContainer>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Get In <span>Touch</span>
      </PageTitle>
      
      <PageDescription
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Have a project in mind or want to collaborate? Feel free to reach out to me using the contact form or through any of the provided contact methods.
      </PageDescription>
      
      <ContactGrid>
        <ContactForm
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
        >
          <FormTitle>Send Me a Message</FormTitle>
          
          {formStatus.submitted && (
            <FormMessage
              success={formStatus.success}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {formStatus.message}
            </FormMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="name">Your Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Your Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? 'Sending...' : (
              <>
                <FiSend /> Send Message
              </>
            )}
          </SubmitButton>
        </ContactForm>
        
        <ContactInfo
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ContactCard variants={itemVariants}>
            <IconWrapper>
              <FiMail />
            </IconWrapper>
            <ContactDetails>
              <h3>Email</h3>
              <a href="mailto:adityaraj3811@gmail.com">adityaraj3811@gmail.com</a>
            </ContactDetails>
          </ContactCard>
          
          <ContactCard variants={itemVariants}>
            <IconWrapper>
              <FiPhone />
            </IconWrapper>
            <ContactDetails>
              <h3>Phone</h3>
              <a href="tel:+919306062521">+91 9306062521</a>
            </ContactDetails>
          </ContactCard>
          
          <ContactCard variants={itemVariants}>
            <IconWrapper>
              <FiMapPin />
            </IconWrapper>
            <ContactDetails>
              <h3>Location</h3>
              <p>Delhi, India</p>
            </ContactDetails>
          </ContactCard>
          
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Connect With Me</h3>
            <SocialLinks variants={containerVariants}>
              <SocialLink
                href="https://www.linkedin.com/in/aditya-raj-4a0879243/"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <FiLinkedin />
              </SocialLink>
              
              <SocialLink
                href="https://github.com/aaditya0204"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <FiGithub />
              </SocialLink>
              
              <SocialLink
                href="mailto:adityaraj3811@gmail.com"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <FiMail />
              </SocialLink>
              
              <SocialLink
                href="https://www.instagram.com/aaditya__930/"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <FiInstagram />
              </SocialLink>
            </SocialLinks>
          </div>
        </ContactInfo>
      </ContactGrid>
    </ContactContainer>
  );
};

export default Contact; 