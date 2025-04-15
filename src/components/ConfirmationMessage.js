import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Message = styled.div`
  color: #4CAF50;
  font-size: 18px;
`;

export const ConfirmationMessage = ({ message, onClose }) => (
  <ModalOverlay>
    <ModalContent>
      <CloseButton onClick={onClose}>×</CloseButton>
      <Message>
        <FaCheckCircle style={{ marginRight: '10px' }} /> {message}
      </Message>
    </ModalContent>
  </ModalOverlay>
);