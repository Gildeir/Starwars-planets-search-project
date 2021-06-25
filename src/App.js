import './App.css';
import React, {} from 'react';
import Table from './components/Table';
import PlanetContext from './context/PlanetContext';
import PlanetProvider from './providers/PlanetProvider';

function App() {
  return (
    <div>
      <PlanetProvider>
        <Table context={ PlanetContext } />
      </PlanetProvider>
    </div>
  );
}

export default App;
