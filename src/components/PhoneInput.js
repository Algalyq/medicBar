import styled from 'styled-components';
import { FaPhoneAlt } from 'react-icons/fa';

const InputContainer = styled.div`
  position: relative;
  margin: 10px 0;
  width: 80%;
  max-width: 300px;
`;

const Input = styled.input`
  padding: 12px 40px 12px 40px;
  border: 2px solid #ddd;
  border-radius: 25px;
  width: 100%;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  }
`;

const Icon = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #757575;
`;

const PhoneInput = ({ value, onChange, placeholder }) => (
  <InputContainer>
    <Icon><FaPhoneAlt /></Icon>
    <Input type="tel" value={value} onChange={onChange} placeholder={placeholder} />
  </InputContainer>
);

export default PhoneInput;