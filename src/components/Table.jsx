import React, { useEffect, useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import HeaderTable from './HeaderTable';
// import FilterValues from './FilterValues';

function Table() {
  const {
    data,
    setData,
    setFilters,
    filters,
    filtersControl,
    dataFilter,
    setDataFilter,
  } = useContext(PlanetContext);
  function handleSearch({ target }) {
    setFilters({
      ...filters,
      filterByName: { name: target.value.toLowerCase() },
    });
  }

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

  function optionsColumnFilter() {
    const options = ['population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water'];

    return (options.map((item, index) => (
      <option
        key={ index }
        id={ item }
        name="column"
        // value="population"

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

  const filterButton = (selections) => {
    console.log(selections.comparison);
    console.log(selections.column);
    console.log(selections.value);
    let filteredData = [];
    if (selections.comparison === 'menor que') {
      filteredData = data.filter((itens) => (
        Number(itens[selections.column]) < Number(selections.value)));
    }
    if (selections.comparison === 'maior que') {
      filteredData = data.filter((itens) => (
        Number(itens[selections.column]) > Number(selections.value)));
    }
    if (selections.comparison === 'igual a') {
      filteredData = data.filter((itens) => (
        Number(itens[selections.column]) === Number(selections.value)));
    }
    setDataFilter(filteredData);
    console.log(filteredData);
    console.log(filters);
  };
  function numericFilters() {
    return (
      <section className="numericFilters">
        <select
          data-testid="column-filter"
          name="column"
          onChange={ (event) => filtersControl(event) }
        >
          {optionsColumnFilter()}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (event) => filtersControl(event) }
          name="comparison"

        >
          {optionComparisonFilter()}
        </select>
        <label htmlFor="number">
          valor:
          <input
            data-testid="value-filter"
            type="number"
            name="value"
            onChange={ (event) => filtersControl(event) }

          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => filterButton(filters) }

        >
          Filtrar

        </button>
      </section>

    );
  }

  function renderTable() {
    if (dataFilter.length !== 0) {
      return (
        <tbody>
          {dataFilter.map((itemFilter, index) => (
            <tr key={ index }>
              {Object.values(itemFilter)
                .map((planetFilter) => (
                  // eslint-disable-next-line react/jsx-key
                  <td>
                    { planetFilter }
                  </td>))}
            </tr>
          ))}
        </tbody>

      );
    }
    return (
      <tbody>
        {data.filter((namesOfPlanets) => namesOfPlanets
          .name.toLowerCase().includes(filters.filterByName.name))
          .map((items, index) => (
            <tr key={ index }>
              {Object.values(items)
                .map((planets) => (
                  <td key={ planets }>
                    { planets }
                  </td>))}
            </tr>
          ))}
      </tbody>
    );
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
