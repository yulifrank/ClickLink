import React, { useEffect, useState } from 'react';
import UrlClicksChart from './UrlClicksChart';
import LinkDetails from './LinkDetails';
import './App.css';

const App = () => {
  const [urlData, setUrlData] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);

  useEffect(() => {
    // Fetch data from API
    fetch('http://localhost:3000/api/links')
      .then((response) => response.json())
      .then((data) => setUrlData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div className="App">
      <main className='all'>
        <UrlClicksChart data={urlData} onLinkClick={handleLinkClick} />
        {selectedLink && <LinkDetails link={selectedLink} />}
      </main>
    </div>
  );
};

export default App;
