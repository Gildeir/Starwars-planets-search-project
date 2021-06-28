import React, { useEffect, useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import HeaderTable from './HeaderTable';

function Table() {
  const {
    data,
    setData,
    setFilters,
    filters,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue } = useContext(PlanetContext);

  useEffect(() => {
    const getPlanet = async () => {
      const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const response = await request.json();
      const result = response.results;
      result.forEach((element) => delete element.residents);
      setData(result);
    };
    getPlanet();
  }, [setData]);

  function handleSearch({ target }) {
    setFilters({
      ...filters,
      filterByName: { name: target.value.toLowerCase() },
    });
  }

  function inputFunc() {
    return (
      <label htmlFor="filter">
        <input
          data-testid="name-filter"
          type="search"
          onChange={ (handleSearch) }
          placeholder="search..."
          id="filter"
        />
      </label>
    );
  }

  function handleClick() {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });
  }

  function optionsColumnFilter() {
    const options = ['population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water'];

    return (options.map((item, index) => (
      <option
        key={ index }
        id={ item }
        name="column"
      >
        {item}
      </option>
    )));
  }

  function optionComparisonFilter() {
    const options = ['maior que', 'menor que', 'igual a'];
    return (options.map((method) => (
      <option
        key={ method }
        id="comparison"
        name="comparison"
        value={ method }
      >
        {method}
      </option>
    )));
  }

  function numericFilters() {
    return (
      <section className="numericFilters">
        <select
          data-testid="column-filter"
          onChange={ (e) => setColumn(e.target.value) }
        >
          {optionsColumnFilter()}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (e) => setComparison(e.target.value) }
        >
          {optionComparisonFilter()}
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          onChange={ (e) => setValue(e.target.value) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleClick }
        >
          Filtrar

        </button>
      </section>

    );
  }

  function renderTable() {
    if (data.length === 0) {
      return data;
    } return (
      <tbody>
        {data.filter((namesOfPlanets) => namesOfPlanets
          .name.toLowerCase().includes(filters.filterByName.name))
          .map((items, index) => (
            <tr key={ index }>
              {Object.values(items)
                .map((planets) => (
                  <td key={ value }>
                    { planets }
                  </td>))}
            </tr>
          ))}
      </tbody>);
  }

  return (
    <div>
      <HeaderTable />
      {inputFunc()}
      {numericFilters()}
      {renderTable()}
    </div>
  );
}

export default Table;
