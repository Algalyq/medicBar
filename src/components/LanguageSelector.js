import styled from 'styled-components';
import { FaGlobe } from 'react-icons/fa';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.5s ease-in;
`;

const LanguageButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 15px 30px;
  margin: 10px;
  border: none;
  border-radius: 25px;
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

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const LanguageSelector = ({ languages, onSelect }) => (
  <Modal>
    <h2><FaGlobe /> Өз тіліңізді таңдаңыз</h2>
    {languages.map(lang => (
      <LanguageButton key={lang.code} onClick={() => onSelect(lang.code)}>
        <FaGlobe /> {lang.name}
      </LanguageButton>
    ))}
  </Modal>
);

export default LanguageSelector;