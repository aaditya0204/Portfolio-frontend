import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/Themes';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.main`
  flex: 1;
  padding-top: 80px; // Adjust based on navbar height
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [userPreferences, setUserPreferences] = useState({
    name: '',
    experience: 'full', // 'full', 'moderate', 'simple'
    mood: 'neutral',
    playMusic: false
  });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const updateUserPreferences = (preferences) => {
    setUserPreferences({ ...userPreferences, ...preferences });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyles />
      <CustomCursor />
      <Router>
        <AppContainer>
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <ContentContainer>
            <AnimatePresence mode="wait">
              <Routes>
                <Route 
                  path="/" 
                  element={<Home userPreferences={userPreferences} updateUserPreferences={updateUserPreferences} />} 
                />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </ContentContainer>
          <Footer />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App; 