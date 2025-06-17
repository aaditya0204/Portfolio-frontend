import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiInstagram, FiPhone } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.footerBackground};
  padding: 3rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
`;

const FooterLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled(motion.a)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const iconVariants = {
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } }
  };
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About</FooterTitle>
          <p>A creative developer passionate about building beautiful and functional web applications.</p>
          <SocialLinks>
            <SocialIcon 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover="hover"
              variants={iconVariants}
            >
              <FiGithub />
            </SocialIcon>
            <SocialIcon 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover="hover"
              variants={iconVariants}
            >
              <FiLinkedin />
            </SocialIcon>
            <SocialIcon 
              href="mailto:adityaraj3811@gmail.com" 
              whileHover="hover"
              variants={iconVariants}
            >
              <FiMail />
            </SocialIcon>
            <SocialIcon 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover="hover"
              variants={iconVariants}
            >
              <FiInstagram />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink 
            href="/"
            whileHover={{ x: 5 }}
          >
            Home
          </FooterLink>
          <FooterLink 
            href="/about"
            whileHover={{ x: 5 }}
          >
            About
          </FooterLink>
          <FooterLink 
            href="/projects"
            whileHover={{ x: 5 }}
          >
            Projects
          </FooterLink>
          <FooterLink 
            href="/contact"
            whileHover={{ x: 5 }}
          >
            Contact
          </FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterLink 
            href="mailto:adityaraj3811@gmail.com"
            whileHover={{ x: 5 }}
          >
            <FiMail /> adityaraj3811@gmail.com
          </FooterLink>
          <FooterLink 
            href="tel:+919306062521"
            whileHover={{ x: 5 }}
          >
            <FiPhone /> +91 9306062521
          </FooterLink>
          <p>Let's work together on your next project!</p>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {currentYear} Portfolio. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 