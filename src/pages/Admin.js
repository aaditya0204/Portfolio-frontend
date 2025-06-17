import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiEye, FiEyeOff, FiClock, FiUser } from 'react-icons/fi';
import axios from 'axios';

const AdminContainer = styled.div`
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

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MessageCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  border-left: 5px solid ${({ read, theme }) => read ? theme.border : theme.primary};
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const MessageSender = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const MessageTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text}99;
`;

const MessageSubject = styled.h3`
  margin-bottom: 1rem;
`;

const MessageContent = styled.p`
  margin-bottom: 1rem;
  white-space: pre-wrap;
`;

const MessageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
`;

const MessageEmail = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MessageStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  
  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.primary};
  }
`;

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages');
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch messages. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchMessages();
  }, []);
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
    <AdminContainer>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin <span>Dashboard</span>
      </PageTitle>
      
      <PageDescription
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        View and manage messages sent through the contact form.
      </PageDescription>
      
      {loading ? (
        <LoadingState>
          <p>Loading messages...</p>
        </LoadingState>
      ) : error ? (
        <EmptyState>
          <h3>Error</h3>
          <p>{error}</p>
        </EmptyState>
      ) : messages.length === 0 ? (
        <EmptyState>
          <h3>No Messages</h3>
          <p>You haven't received any messages yet.</p>
        </EmptyState>
      ) : (
        <MessagesContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              variants={itemVariants}
              read={message.read}
            >
              <MessageHeader>
                <MessageSender>
                  <FiUser /> {message.name}
                </MessageSender>
                <MessageTime>
                  <FiClock /> {formatDate(message.timestamp)}
                </MessageTime>
              </MessageHeader>
              
              <MessageSubject>
                {message.subject || 'No Subject'}
              </MessageSubject>
              
              <MessageContent>
                {message.message}
              </MessageContent>
              
              <MessageFooter>
                <MessageEmail href={`mailto:${message.email}`}>
                  <FiMail /> {message.email}
                </MessageEmail>
                <MessageStatus>
                  {message.read ? (
                    <>
                      <FiEye /> Read
                    </>
                  ) : (
                    <>
                      <FiEyeOff /> Unread
                    </>
                  )}
                </MessageStatus>
              </MessageFooter>
            </MessageCard>
          ))}
        </MessagesContainer>
      )}
    </AdminContainer>
  );
};

export default Admin; 