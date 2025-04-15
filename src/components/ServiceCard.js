import styled from 'styled-components';
import { Button } from './Button';

export const ServiceCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme?.shadows?.md || '0 4px 6px rgba(0,0,0,0.1)'};
  transition: all 0.3s ease;
  text-align: center;
  overflow: hidden;
  position: relative;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme?.shadows?.lg || '0 10px 15px rgba(0,0,0,0.1)'};
  }

  @media (max-width: 768px) {
    padding: 16px;
    max-width: 280px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    max-width: 100%;
  }
`;

export const ServicePrice = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${({ theme }) => theme?.colors?.primary || '#2E8B57'};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 3px 8px;
    top: 12px;
    right: 12px;
  }
`;

export const ServiceImage = styled.div`
  width: 100%;
  height: 160px;
  background: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    height: 140px;
  }

  @media (max-width: 480px) {
    height: 150px;
    margin-bottom: 12px;
  }
`;
