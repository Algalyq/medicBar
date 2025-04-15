import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeContainer from './containers/HomeContainer';
import Layout from './components/Layout';

function App() {
  const language = 'en'; // assuming language is defined somewhere, replace with actual definition
  const translations = {
    en: {
      pageTitle: 'MedicBar'
    },
    // add other languages as needed
  };

  useEffect(() => {
    document.title = translations[language]?.pageTitle || 'MedicBar';
  }, [language]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;