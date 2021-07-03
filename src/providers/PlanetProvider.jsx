import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from '../context/PlanetContext';

const initialState = {
  filterByName: { name: '' },
};

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initialState);
  const [column, setColumn] = useState('');
  const [newColumn, setNewColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');
  const [newValue, setNewValue] = useState();
  const [dataFilter, setDataFilter] = useState([]);

  function filtersControl({ target }) {
    setFilters({
      ...filters,
      ...filters.filtersByNumericValues,
      filtersByNumericValues: {
        [target.name]: target.value,
      },
    });
  }

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
    newValue,
    setNewValue,
    filtersControl,
    dataFilter,
    setDataFilter,
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
