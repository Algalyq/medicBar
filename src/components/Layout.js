import styled from 'styled-components';
// import backgroundImage from './assets/medical-background.jpg'; // Add this image to src/assets

const Container = styled.div`

  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #757575;
  font-family: 'Roboto', sans-serif;
`;

const Header = styled.header`
  color: #4CAF50;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Layout = ({ children }) => (
  <Container>
    {/* <Header>Medics at Home</Header> */}
    {children}
  </Container>
);

export default Layout;