import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${({ theme }) => theme.navBackground};
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  
  span {
    color: ${({ theme }) => theme.secondary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.div)`
  position: relative;
  font-weight: 500;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${({ active }) => (active ? '100%' : '0')};
    height: 2px;
    background-color: ${({ theme }) => theme.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggle = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.border};
  }
`;

const MobileMenuButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.background};
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const MobileNavLink = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme, active }) => (active ? theme.primary : theme.text)};
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
`;

const Navbar = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };
  
  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };
  
  return (
    <>
      <NavContainer 
        initial="hidden"
        animate="visible"
        variants={navVariants}
        style={{ boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none' }}
      >
        <Logo
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          PORT<span>FOLIO</span>
        </Logo>
        
        <NavLinks>
          <NavLink 
            active={location.pathname === '/' ? 1 : 0}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Link to="/">Home</Link>
          </NavLink>
          
          <NavLink 
            active={location.pathname === '/about' ? 1 : 0}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Link to="/about">About</Link>
          </NavLink>
          
          <NavLink 
            active={location.pathname === '/projects' ? 1 : 0}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <Link to="/projects">Projects</Link>
          </NavLink>
          
          <NavLink 
            active={location.pathname === '/contact' ? 1 : 0}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <Link to="/contact">Contact</Link>
          </NavLink>
        </NavLinks>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeToggle 
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </ThemeToggle>
          
          <MobileMenuButton 
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
          >
            <FiMenu />
          </MobileMenuButton>
        </div>
      </NavContainer>
      
      {mobileMenuOpen && (
        <MobileMenu
          initial="closed"
          animate="open"
          exit="closed"
          variants={mobileMenuVariants}
        >
          <CloseButton 
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
          >
            <FiX />
          </CloseButton>
          
          <MobileNavLink 
            active={location.pathname === '/' ? 1 : 0}
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">Home</Link>
          </MobileNavLink>
          
          <MobileNavLink 
            active={location.pathname === '/about' ? 1 : 0}
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/about">About</Link>
          </MobileNavLink>
          
          <MobileNavLink 
            active={location.pathname === '/projects' ? 1 : 0}
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/projects">Projects</Link>
          </MobileNavLink>
          
          <MobileNavLink 
            active={location.pathname === '/contact' ? 1 : 0}
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact">Contact</Link>
          </MobileNavLink>
          
          <ThemeToggle 
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            style={{ marginTop: '2rem' }}
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </ThemeToggle>
        </MobileMenu>
      )}
    </>
  );
};

export default Navbar; 