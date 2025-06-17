import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorOuter = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CursorInner = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    window.addEventListener('mousemove', mouseMove);
    
    // Add event listeners for cursor variants
    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');
    
    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  // Variants for cursor animations
  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      transition: {
        type: 'tween',
        ease: 'linear',
        duration: 0.1,
      },
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.5,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      transition: {
        type: 'tween',
        ease: 'linear',
        duration: 0.1,
      },
    },
  };
  
  const innerVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      transition: {
        type: 'tween',
        ease: 'linear',
        duration: 0.05,
      },
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 2,
      transition: {
        type: 'tween',
        ease: 'linear',
        duration: 0.05,
      },
    },
  };
  
  // Hide cursor on mobile devices
  if (window.innerWidth <= 768) {
    return null;
  }
  
  return (
    <>
      <CursorOuter
        variants={variants}
        animate={cursorVariant}
        initial={false}
      />
      <CursorInner
        variants={innerVariants}
        animate={cursorVariant}
        initial={false}
      />
    </>
  );
};

export default CustomCursor; 