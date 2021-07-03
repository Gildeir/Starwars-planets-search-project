import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from '../context/PlanetContext';

const initialState = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [{
    column: 'population',
    comparison: 'maior que',
    value: '0',
  }],
};

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [column, setColumn] = useState('');
  const [newColumn, setNewColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const [filters, setFilters] = useState(initialState);

  const context = {
    data,
    setData,
    filters,
    setFilters,
    column,
    setColumn,
    newColumn,
    setNewColumn,
    comparison,
    setComparison,
    value,
    setValue,
  };

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
