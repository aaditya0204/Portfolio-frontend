import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCode, FiLayers, FiServer, FiDatabase, FiTool } from 'react-icons/fi';
import profilePic from '../assets/PROFILE_PIC.jpg';

const AboutContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled(motion.h1)`
  margin-bottom: 3rem;
  text-align: center;
  
  span {
    color: ${({ theme }) => theme.primary};
  }
`;

const Section = styled(motion.section)`
  margin-bottom: 5rem;
`;

const SectionTitle = styled(motion.h2)`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  svg {
    color: ${({ theme }) => theme.primary};
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutContent = styled(motion.div)`
  p {
    margin-bottom: 1.5rem;
  }
`;

const AboutImage = styled(motion.div)`
  position: relative;
  border-radius: 55px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  
  img {
    width: 130%;
    height: 130%;
    margin-left: -20px;
    margin-top: -80px;
    object-fit: cover;
    object-position: center;
}
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom right,
      ${({ theme }) => theme.primary}10,
      ${({ theme }) => theme.secondary}10
    );
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const SkillCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const SkillTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  svg {
    color: ${({ theme }) => theme.primary};
  }
`;

const SkillList = styled.ul`
  li {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    
    &::before {
      content: '•';
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
`;

// const TimelineContainer = styled.div`
//   position: relative;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     width: 2px;
//     background-color: ${({ theme }) => theme.border};
    
//     @media (max-width: 768px) {
//       left: 20px;
//     }
//   }
// `;

// const TimelineItem = styled(motion.div)`
//   position: relative;
//   padding-left: 2rem;
//   padding-bottom: 3rem;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -8px;
//     width: 18px;
//     height: 18px;
//     border-radius: 50%;
//     background-color: ${({ theme }) => theme.primary};
    
//     @media (max-width: 768px) {
//       left: 12px;
//     }
//   }
  
//   @media (max-width: 768px) {
//     padding-left: 3rem;
//   }
// `;

// const TimelineDate = styled.div`
//   font-weight: 600;
//   color: ${({ theme }) => theme.primary};
//   margin-bottom: 0.5rem;
// `;

// const TimelineTitle = styled.h3`
//   margin-bottom: 0.5rem;
// `;

// const TimelineCompany = styled.div`
//   font-style: italic;
//   margin-bottom: 1rem;
// `;

const About = () => {
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
    <AboutContainer>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About <span>Me</span>
      </PageTitle>

      <Section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AboutGrid>
          <AboutContent variants={itemVariants}>
            <p>
              Hello! I'm Aditya Raj, a passionate Full Stack Developer with a love for creating beautiful, functional, and user-friendly web applications. Currently, I'm in my 3rd year of college and have 1.5 years of experience in web development.
            </p>
            <p>
              My journey in web development started when I was in college, where I discovered my passion for coding and problem-solving. Since then, I've worked on various projects, from small business websites to complex enterprise applications, constantly honing my skills and staying up to date with the latest technologies
            </p>
            <p>
              I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends and best practices. My goal is to create web applications that not only look great but also provide an exceptional user experience.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities like hiking and photography.
            </p>
          </AboutContent>

          <AboutImage
            variants={itemVariants}
          >
            <img src={profilePic} alt="Profile" />
          </AboutImage>
        </AboutGrid>
      </Section>

      <Section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <SectionTitle variants={itemVariants}>
          <FiCode /> My Skills
        </SectionTitle>

        <SkillsGrid>
          <SkillCard variants={itemVariants}>
            <SkillTitle>
              <FiLayers /> Frontend
            </SkillTitle>
            <SkillList>
              <li>React.js</li>
              <li>JavaScript (ES6+)</li>
              <li>HTML5 & CSS3</li>
              <li>Styled Components</li>
              <li>Framer Motion</li>
              <li>Responsive Design</li>
            </SkillList>
          </SkillCard>

          <SkillCard variants={itemVariants}>
            <SkillTitle>
              <FiServer /> Backend
            </SkillTitle>
            <SkillList>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>RESTful APIs</li>
              
              <li>Authentication & Authorization</li>
              <li>Serverless Functions</li>
            </SkillList>
          </SkillCard>

          <SkillCard variants={itemVariants}>
            <SkillTitle>
              <FiDatabase /> Database
            </SkillTitle>
            <SkillList>
              <li>MongoDB</li>
              <li>MySQL</li>
              
            </SkillList>
          </SkillCard>

          <SkillCard variants={itemVariants}>
            <SkillTitle>
              <FiTool /> Tools & Others
            </SkillTitle>
            <SkillList>
              <li>Git & GitHub</li>
              <li>Docker</li>
              <li>CI/CD</li>
              <li>AWS Basics</li>
              <li>Vercel </li>
            </SkillList>
          </SkillCard>
        </SkillsGrid>
      </Section>

      <Section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        
      </Section>
    </AboutContainer>
  );
};

export default About; 