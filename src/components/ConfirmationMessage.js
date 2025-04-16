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
  padding: 16px;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 8px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 4px;
  line-height: 1;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }

  @media (max-width: 480px) {
    top: 8px;
    right: 8px;
    font-size: 1.3rem;
  }
`;

const Message = styled.div`
  color: #4CAF50;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 1rem 0;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 1rem;
    flex-direction: column;
    gap: 8px;
  }
`;

const ActionButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  width: 100%;
  max-width: 200px;

  &:hover {
    background: #3e8e41;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    padding: 0.7rem 1.2rem;
    max-width: none;
  }
`;

export const ConfirmationMessage = ({ message, onClose }) => (
  <ModalOverlay onClick={onClose}>
    <ModalContent onClick={e => e.stopPropagation()}>
      <CloseButton 
        onClick={onClose}
        aria-label="Close confirmation message"
      >
        ×
      </CloseButton>
      <Message>
        <FaCheckCircle size={24} />
        <span>{message}</span>
      </Message>
      <ActionButton onClick={onClose}>
        OK
      </ActionButton>
    </ModalContent>
  </ModalOverlay>
);