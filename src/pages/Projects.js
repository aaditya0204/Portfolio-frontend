import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiFilter } from 'react-icons/fi';

const ProjectsContainer = styled.div`
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

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  background-color: ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.text};
  border: 2px solid ${({ active, theme }) => active ? theme.primary : theme.border};
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ active, theme }) => active ? 'white' : theme.primary};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${ProjectCard}:hover & img {
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ProjectTag = styled.span`
  background-color: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  
  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.primary};
  }
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API call to fetch projects
    setTimeout(() => {
      const fetchedProjects = [
        {
          id: 1,
          title: 'E-Commerce Platform',
          description: 'A full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.',
          image: 'https://via.placeholder.com/600x400',
          tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
          category: 'fullstack',
          liveLink: 'https://example.com',
          githubLink: 'https://github.com',
        },
        {
          id: 2,
          title: 'Social Media Dashboard',
          description: 'Analytics dashboard for social media performance tracking with real-time data visualization.',
          image: 'https://via.placeholder.com/600x400',
          tags: ['React', 'Chart.js', 'Node.js', 'Express'],
          category: 'frontend',
          liveLink: 'https://example.com',
          githubLink: 'https://github.com',
        },
        {
          id: 3,
          title: 'Task Management App',
          description: 'A collaborative task management application with real-time updates and team collaboration features.',
          image: 'https://via.placeholder.com/600x400',
          tags: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
          category: 'fullstack',
          liveLink: 'https://example.com',
          githubLink: 'https://github.com',
        },
        {
          id: 4,
          title: 'Weather Forecast App',
          description: 'A weather forecast application with location-based weather data and 7-day forecast.',
          image: 'https://via.placeholder.com/600x400',
          tags: ['React', 'API Integration', 'Geolocation'],
          category: 'frontend',
          liveLink: 'https://example.com',
          githubLink: 'https://github.com',
        },
        {
          id: 5,
          title: 'Blog CMS',
          description: 'A content management system for blogs with markdown support and image uploads.',
          image: 'https://via.placeholder.com/600x400',
          tags: ['Node.js', 'Express', 'MongoDB', 'RESTful API'],
          category: 'backend',
          liveLink: 'https://example.com',
          githubLink: 'https://github.com',
        },
        {
          id: 6,
          title: 'Real Estate Listing Platform',
          description: 'A platform for real estate listings with search, filtering, and user accounts.',
          image: 'https://via.placeholder.com/600x400',
          tags: ['React', 'Node.js', 'PostgreSQL', 'Express'],
          category: 'fullstack',
          liveLink: 'https://example.com',
          githubLink: 'https://github.com',
        },
      ];
      
      setProjects(fetchedProjects);
      setFilteredProjects(fetchedProjects);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleFilterChange = (category) => {
    setActiveFilter(category);
    
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <ProjectsContainer>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My <span>Projects</span>
      </PageTitle>
      
      <PageDescription
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Here are some of the projects I've worked on. Each project represents a unique challenge and solution.
      </PageDescription>
      
      <FilterContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <FilterButton
          active={activeFilter === 'all'}
          onClick={() => handleFilterChange('all')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiFilter /> All
        </FilterButton>
        
        <FilterButton
          active={activeFilter === 'frontend'}
          onClick={() => handleFilterChange('frontend')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Frontend
        </FilterButton>
        
        <FilterButton
          active={activeFilter === 'backend'}
          onClick={() => handleFilterChange('backend')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Backend
        </FilterButton>
        
        <FilterButton
          active={activeFilter === 'fullstack'}
          onClick={() => handleFilterChange('fullstack')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Full Stack
        </FilterButton>
      </FilterContainer>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Loading projects...</p>
        </div>
      ) : (
        <>
          {filteredProjects.length > 0 ? (
            <ProjectsGrid
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    variants={itemVariants}
                    layout
                  >
                    <ProjectImage>
                      <img src={project.image} alt={project.title} />
                    </ProjectImage>
                    
                    <ProjectContent>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <ProjectDescription>{project.description}</ProjectDescription>
                      
                      <ProjectTags>
                        {project.tags.map((tag, index) => (
                          <ProjectTag key={index}>{tag}</ProjectTag>
                        ))}
                      </ProjectTags>
                      
                      <ProjectLinks>
                        <ProjectLink
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 5 }}
                        >
                          <FiExternalLink /> Live Demo
                        </ProjectLink>
                        
                        <ProjectLink
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 5 }}
                        >
                          <FiGithub /> Source Code
                        </ProjectLink>
                      </ProjectLinks>
                    </ProjectContent>
                  </ProjectCard>
                ))}
              </AnimatePresence>
            </ProjectsGrid>
          ) : (
            <EmptyState
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>No projects found</h3>
              <p>No projects match the selected filter. Try selecting a different category.</p>
            </EmptyState>
          )}
        </>
      )}
    </ProjectsContainer>
  );
};

export default Projects; 