import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoaderText = styled(motion.div)`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.primary};
  
  span {
    display: inline-block;
    color: ${({ theme }) => theme.secondary};
  }
`;

const ProgressBarContainer = styled.div`
  width: 300px;
  height: 4px;
  background-color: ${({ theme }) => theme.border};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 4px;
`;

const LoadingText = styled(motion.p)`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const Loader = () => {
  useEffect(() => {
    // Animate the letters with GSAP
    const letters = document.querySelectorAll('.loader-letter');
    
    gsap.fromTo(
      letters,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      }
    );
  }, []);
  
  const progressVariants = {
    initial: { width: 0 },
    animate: { 
      width: '100%', 
      transition: { 
        duration: 1.5, 
        ease: 'easeInOut' 
      } 
    }
  };
  
  const loadingTextVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: [0.2, 1, 0.2], 
      transition: { 
        duration: 1.5, 
        ease: 'easeInOut', 
        repeat: Infinity 
      } 
    }
  };
  
  const letters = 'PORTFOLIO'.split('');
  
  return (
    <LoaderContainer>
      <LoaderText>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="loader-letter"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {letter}
          </motion.span>
        ))}
      </LoaderText>
      
      <ProgressBarContainer>
        <ProgressBar
          variants={progressVariants}
          initial="initial"
          animate="animate"
        />
      </ProgressBarContainer>
      
      <LoadingText
        variants={loadingTextVariants}
        initial="initial"
        animate="animate"
      >
        Loading amazing experience...
      </LoadingText>
    </LoaderContainer>
  );
};

export default Loader; 