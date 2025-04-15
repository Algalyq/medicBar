import React from 'react';
import styled from 'styled-components';
import { FaUserMd, FaVideo, FaComment } from 'react-icons/fa';

const Section = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Card = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ServiceButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 25px;
  margin: 5px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Comment = styled(Card)`
  background-color: #e8f5e9;
  border-left: 5px solid #4CAF50;
`;

const Content = ({ medicInfo, services, comments, language, onServiceSelect }) => {
  return (
    <>
      <Section>
        <h2><FaUserMd /> About Our Medics</h2>
        <p>{medicInfo}</p>
      </Section>

      <Section>
        <h2><FaVideo /> Our Services</h2>
        {services.map(service => (
          <ServiceButton key={service.id} onClick={() => onServiceSelect(service.id)}>
            {service.id === 'home' ? <FaUserMd /> : <FaVideo />} {service.name}
            <span>{service.description[language]}</span>
          </ServiceButton>
        ))}
      </Section>

      <Section>
        <h2><FaComment /> What Our Users Say</h2>
        {comments.map(comment => (
          <Comment key={comment.id}>
            <FaComment /> <p>{comment.text[language]}</p>
            <small>Rating: {comment.rating}/5</small>
          </Comment>
        ))}
      </Section>
    </>
  );
};

export default Content;