import React, { useEffect, useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import HeaderTable from './HeaderTable';

function Table() {
  const { data, setData, setFilters, filters } = useContext(PlanetContext);

  useEffect(() => {
    const getPlanet = async () => {
      const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const response = await request.json();
      const result = response.results;
      result.forEach((element) => delete element.residents);
      console.log(result);
      setData(result);
    };
    getPlanet();
  }, [setData]);

  function handleSearch({ target: { value } }) {
    setFilters({
      ...filters,
      filterByName: value.toLowerCase(),
    });
  }

  function inputFunc() {
    return (<input
      data-testid="name-filter"
      type="text"
      onChange={ handleSearch }
      placeholder="search..."
    />);
  }

  return (
    <div>
      <HeaderTable />
      <tbody>
        {inputFunc()}
        {data.filter((names) => names.name.toLowerCase().includes(filters.filterByName))
          .map((items, index) => (
            <tr key={ index }>
              <td>{Object.values(items.name)}</td>
              <td>{Object.values(items.rotation_period)}</td>
              <td>{Object.values(items.orbital_period)}</td>
              <td>{Object.values(items.diameter)}</td>
              <td>{Object.values(items.climate)}</td>
              <td>{Object.values(items.gravity)}</td>
              <td>{Object.values(items.terrain)}</td>
              <td>{Object.values(items.surface_water)}</td>
              <td>{Object.values(items.population)}</td>
              <td>{Object.values(items.films)}</td>
              <td>{Object.values(items.created)}</td>
              <td>{Object.values(items.edited)}</td>
              <td>{Object.values(items.url)}</td>
            </tr>
          ))}
      </tbody>
    </div>
  );
}

export default Table;
