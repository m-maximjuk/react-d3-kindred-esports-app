import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Tabletop from 'tabletop';

import { TranslationProvider } from './contexts/TranslationContext';
import { VisualizationProvider } from './contexts/VisualizationContext';

import { Header, Footer } from './components';
import Routes from './Routes';

function App() {
  const vizDataUrl =
    'https://docs.google.com/spreadsheets/d/1ypM-P9GZgEJTGuKd3MQVObHOcbf6ojapgYGnFxbWrZ8/edit?usp=sharing';
  const siteDataUrl =
    'https://docs.google.com/spreadsheets/d/1kBjk27IM-htqUmJhSCg87sJngFFL0Q1-nrjcAJC9hJ0/edit?usp=sharing';

  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [vizData, setVizData] = useState([]);
  const [siteData, setSiteData] = useState([]);

  useEffect(() => {
    Tabletop.init({
      key: vizDataUrl,
      callback: getVizDataFromSheets,
      parseNumbers: true
    });

    function getVizDataFromSheets(vizData, tabletop) {
      setVizData(vizData);

      Tabletop.init({
        key: siteDataUrl,
        callback: getSiteDataFromSheets,
        parseNumbers: true
      });

      function getSiteDataFromSheets(siteData, tabletop) {
        setSiteData(siteData);
        setLoading(false);
      }
    }
  }, []);

  return (
    <Router>
      <TranslationProvider value={{ lang: language, data: siteData }}>
        <Header />

        {!loading && (
          <VisualizationProvider value={vizData}>
            <main className='main' id='main'>
              <Routes setLanguage={lang => setLanguage(lang)} />
            </main>
          </VisualizationProvider>
        )}

        <Footer />
      </TranslationProvider>
    </Router>
  );
}

export default App;
