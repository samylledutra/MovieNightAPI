import React from 'react';

const Header = ({ selectedProvider, activeSearchTerm, onProviderChange, streamingProviders }) => {
  return (
    <header>
      <nav className="provider-navigation">
     <label htmlFor="provider-select">Plataforma:</label>
        <select
          id="provider-select"
          className="provider-select" 
          value={selectedProvider}
          onChange={(e) => onProviderChange(e.target.value)}
          disabled={!!activeSearchTerm}
        >

        {Object.keys(streamingProviders).map((providerName) => (
           <option key={providerName} value={providerName}>
              {providerName}
            </option>
          ))}
        </select>
      </nav>
    </header>
  );
};

export default Header;