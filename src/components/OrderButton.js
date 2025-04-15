import styled from 'styled-components';
import { FaPhone } from 'react-icons/fa';

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 20px 40px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    background-color: #66BB6A;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const OrderButton = ({ onClick, label }) => (
  <Button onClick={onClick}>
    <FaPhone /> {label}
  </Button>
);

export default OrderButton;