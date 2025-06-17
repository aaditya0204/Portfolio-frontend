import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX , FiVolume2, FiVolumeX } from 'react-icons/fi';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.primary};
  text-align: center;
`;

const ModalDescription = styled.p`
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
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

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const RadioOption = styled.div`
  flex: 1;
  min-width: 120px;
`;

const RadioButton = styled.input`
  display: none;
  
  &:checked + label {
    border-color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary}10;
  }
`;

const RadioLabel = styled.label`
  display: block;
  padding: 0.8rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const MoodOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const MoodOption = styled.button`
  background-color: ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.text};
  border: 2px solid ${({ active, theme }) => active ? theme.primary : theme.border};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

const MusicToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 24px;
  background-color: ${({ active, theme }) => active ? theme.primary : theme.border};
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ active }) => active ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
`;

const UserPreferencesModal = ({ onClose, onUpdatePreferences, initialPreferences }) => {
  const [name, setName] = useState(initialPreferences.name || '');
  const [experience, setExperience] = useState(initialPreferences.experience || 'full');
  const [mood, setMood] = useState(initialPreferences.mood || 'neutral');
  const [playMusic, setPlayMusic] = useState(initialPreferences.playMusic || false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdatePreferences({
      name,
      experience,
      mood,
      playMusic
    });
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: 50,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  };
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  const moods = ['neutral', 'relaxed', 'excited', 'happy', 'focused'];
  
  return (
    <AnimatePresence>
      <ModalOverlay
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ModalContainer
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <CloseButton 
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX />
          </CloseButton>
          
          <ModalTitle>Customize Your Experience</ModalTitle>
          <ModalDescription>
            This is a one-time setup, but you can change these preferences later.
          </ModalDescription>
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">What's your name?</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Choose your experience</Label>
              <RadioGroup>
                <RadioOption>
                  <RadioButton
                    type="radio"
                    id="full"
                    name="experience"
                    value="full"
                    checked={experience === 'full'}
                    onChange={() => setExperience('full')}
                  />
                  <RadioLabel htmlFor="full">Full Experience</RadioLabel>
                </RadioOption>
                
                <RadioOption>
                  <RadioButton
                    type="radio"
                    id="moderate"
                    name="experience"
                    value="moderate"
                    checked={experience === 'moderate'}
                    onChange={() => setExperience('moderate')}
                  />
                  <RadioLabel htmlFor="moderate">Moderate</RadioLabel>
                </RadioOption>
                
                <RadioOption>
                  <RadioButton
                    type="radio"
                    id="simple"
                    name="experience"
                    value="simple"
                    checked={experience === 'simple'}
                    onChange={() => setExperience('simple')}
                  />
                  <RadioLabel htmlFor="simple">Simple</RadioLabel>
                </RadioOption>
              </RadioGroup>
            </FormGroup>
            
            <FormGroup>
              <Label>How are you feeling today?</Label>
              <MoodOptions>
                {moods.map((m) => (
                  <MoodOption
                    key={m}
                    type="button"
                    active={mood === m}
                    onClick={() => setMood(m)}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </MoodOption>
                ))}
              </MoodOptions>
            </FormGroup>
            
            <MusicToggle>
              {playMusic ? <FiVolume2 /> : <FiVolumeX />}
              <Label>Background Music</Label>
              <ToggleSwitch
                active={playMusic}
                onClick={() => setPlayMusic(!playMusic)}
              />
            </MusicToggle>
            
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!name.trim()}
            >
              Start Exploring
            </SubmitButton>
          </Form>
        </ModalContainer>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default UserPreferencesModal; 