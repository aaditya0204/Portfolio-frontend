import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

// Components
import UserPreferencesModal from '../components/UserPreferencesModal';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    text-align: center;
    padding: 0 1rem;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 5rem);
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  span {
    color: ${({ theme }) => theme.primary};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  margin-bottom: 2.5rem;
  max-width: 600px;
  
  @media (max-width: 768px) {
    margin: 0 auto 2.5rem;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.button)`
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
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: 0.8rem 2rem;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  p {
    font-size: 0.9rem;
    opacity: 0.7;
  }
`;

const ScrollLine = styled(motion.div)`
  width: 2px;
  height: 60px;
  background-color: ${({ theme }) => theme.primary};
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.background};
    animation: scrollAnimation 1.5s ease-in-out infinite;
  }
  
  @keyframes scrollAnimation {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
`;

const Home = ({ userPreferences, updateUserPreferences }) => {
  const [showPreferencesModal, setShowPreferencesModal] = useState(!userPreferences.name);
  
  const handleCloseModal = () => {
    setShowPreferencesModal(false);
  };
  
  const handleUpdatePreferences = (preferences) => {
    updateUserPreferences(preferences);
    setShowPreferencesModal(false);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <HomeContainer>
      {showPreferencesModal && (
        <UserPreferencesModal
          onClose={handleCloseModal}
          onUpdatePreferences={handleUpdatePreferences}
          initialPreferences={userPreferences}
        />
      )}
      
      <HeroSection>
        <HeroContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroTitle variants={itemVariants}>
              I'm a <span>Creative Developer</span>
            </HeroTitle>
            
            <HeroSubtitle variants={itemVariants}>
              I create beautiful, interactive, and responsive web experiences that engage users and deliver results.
            </HeroSubtitle>
            
            <ButtonContainer variants={itemVariants}>
              <Link to="/projects">
                <PrimaryButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects <FiArrowRight />
                </PrimaryButton>
              </Link>
              
              <Link to="/contact">
                <SecondaryButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </SecondaryButton>
              </Link>
            </ButtonContainer>
          </motion.div>
          
          <ScrollIndicator
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p>Scroll Down</p>
            <ScrollLine />
          </ScrollIndicator>
        </HeroContent>
      </HeroSection>
      
      {/* Additional sections can be added here */}
    </HomeContainer>
  );
};

export default Home; 