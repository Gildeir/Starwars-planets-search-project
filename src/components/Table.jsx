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
  } = useContext(PlanetContext);

  console.log(data);

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

  const { column, comparison, value } = filters.filterByNumericValues[0];

  function filterData({ target }) {
    let newColumn = filters.filterByNumericValues[0].column;
    let newComparison = filters.filterByNumericValues[0].comparison;
    let newValue = filters.filterByNumericValues[0].value;
    switch (target.name) {
    case 'column':
      newColumn = target.value;
      break;
    case 'comparison':
      newComparison = target.value;
      break;
    default:
      newValue = target.value;
    }
    setFilters({
      ...filters,
      filterByNumericValues: [
        {
          column: newColumn,
          comparison: newComparison,
          value: newValue,
        },

      ],
    });
    console.log(target.name);
  }

  function filteredData() {
    let newData = data;

    switch (comparison) {
    case 'maior que':
      newData = data.filter((planet) => (
        parseInt(planet[column], 10)
       > parseInt(value, 10) && planet.name.includes(filters.filterByName.name)
      ));
      break;
    case 'igual a':
      newData = data.filter((planet) => (
        parseInt(planet[column], 10) === parseInt(value, 10)
       && planet.name.includes(filters.filterByName.name)
      ));
      break;
    default:
      console.log(filters.filterByName);
      newData = data.filter((planet) => (
        parseInt(planet[column], 10)
       < parseInt(value, 10) && planet.name.includes(filters.filterByName.name)
      ));
      break;
    }
    setData(newData);
  }

  function renderTable() {
    if (data.length === 0) {
      return data;
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
      <label htmlFor="filter">
        <input
          data-testid="name-filter"
          type="search"
          onChange={ (handleSearch) }
          placeholder="search..."
          id="filter"
        />
      </label>
      <section className="numericFilters">
        <select
          data-testid="column-filter"
          name="column"
          onChange={ filterData }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ filterData }
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
        <label htmlFor="number">
          valor:
          <input
            data-testid="value-filter"
            type="number"
            name="value"
            id="number"
            min="0"
            onChange={ filterData }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ filteredData }
        >
          Filtrar

        </button>
      </section>
      {renderTable()}
    </div>
  );
}

export default Table;
