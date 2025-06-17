import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const NotFoundContainer = styled.div`
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

const ErrorCode = styled(motion.h1)`
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
  line-height: 1;
`;

const ErrorTitle = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 1.5rem;
`;

const ErrorDescription = styled(motion.p)`
  max-width: 500px;
  margin-bottom: 2rem;
`;

const BackButton = styled(motion.button)`
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
`;

const NotFound = () => {
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
    <NotFoundContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ErrorCode
          variants={itemVariants}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </ErrorCode>
        
        <ErrorTitle variants={itemVariants}>
          Page Not Found
        </ErrorTitle>
        
        <ErrorDescription variants={itemVariants}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </ErrorDescription>
        
        <motion.div variants={itemVariants}>
          <Link to="/">
            <BackButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft /> Back to Home
            </BackButton>
          </Link>
        </motion.div>
      </motion.div>
    </NotFoundContainer>
  );
};

export default NotFound; 