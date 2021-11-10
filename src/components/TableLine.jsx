import React from 'react';
import PropTypes from 'prop-types';

const TableLine = ({ planet }) => {
  const { climate, diameter, gravity, name, population,
    terrain, created, edited, films, url } = planet;
  return (
    <tr>
      <td data-testid="planet-name">{name}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.orbital_period}</td>
      <td>{diameter}</td>
      <td>{climate}</td>
      <td>{gravity}</td>
      <td>{terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{population}</td>
      <td>{created}</td>
      <td>{edited}</td>
      <td>{JSON.stringify(films)}</td>
      <td>{url}</td>
    </tr>
  );
};

TableLine.propTypes = {
  planet: PropTypes.shape({
    created: PropTypes.string,
    edited: PropTypes.string,
    url: PropTypes.string,
    films: PropTypes.instanceOf(Array),
    climate: PropTypes.string,
    diameter: PropTypes.string,
    gravity: PropTypes.string,
    name: PropTypes.string,
    orbital_period: PropTypes.string,
    population: PropTypes.string,
    surface_water: PropTypes.string,
    terrain: PropTypes.string,
    rotation_period: PropTypes.string,
  }).isRequired,
};

export default TableLine;
