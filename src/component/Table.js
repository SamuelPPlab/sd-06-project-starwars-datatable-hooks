import React, { useEffect, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const tableHeader = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate',
    'gravity', 'terrain', 'surface_water', 'population', 'films', 'created', 'edited',
    'url'];
  const { data, getPlanetsData } = useContext(StarWarsContext);

  useEffect(() => {
    getPlanetsData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          { tableHeader.map((header) => <th key={ header }>{ header }</th>) }
        </tr>
      </thead>
      <tbody>
        { data.map((dataPlanets) => (
          <tr key={ dataPlanets.name }>
            <td>{ dataPlanets.name }</td>
            <td>{ dataPlanets.rotation_period }</td>
            <td>{ dataPlanets.orbital_period }</td>
            <td>{ dataPlanets.diameter }</td>
            <td>{ dataPlanets.climate }</td>
            <td>{ dataPlanets.gravity }</td>
            <td>{ dataPlanets.terrain }</td>
            <td>{ dataPlanets.surface_water }</td>
            <td>{ dataPlanets.population }</td>
            <td>{ dataPlanets.films }</td>
            <td>{ dataPlanets.created }</td>
            <td>{ dataPlanets.edited }</td>
            <td>{ dataPlanets.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
