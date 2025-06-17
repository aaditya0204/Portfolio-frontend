import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: 'Inter', 'Roboto', sans-serif;
    scroll-behavior: smooth;
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }

  body {
    cursor: none; /* Hide default cursor for custom cursor */
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: none;
  }

  button {
    cursor: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
  }

  p {
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  /* Container */
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    h1 {
      font-size: clamp(2rem, 8vw, 3rem);
    }
    
    h2 {
      font-size: clamp(1.8rem, 6vw, 2.5rem);
    }
    
    h3 {
      font-size: clamp(1.2rem, 4vw, 2rem);
    }
    
    p {
      font-size: 1rem;
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease forwards;
  }

  .slide-up {
    animation: slideUp 0.5s ease forwards;
  }
`; 