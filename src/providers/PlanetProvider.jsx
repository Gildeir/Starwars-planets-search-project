import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from '../context/PlanetContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);

  const context = { data, setData, filters, setFilters };
  return (
    <PlanetContext.Provider value={ context }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
