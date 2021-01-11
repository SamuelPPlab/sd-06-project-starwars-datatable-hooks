import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import fetchPlanetsAPI from '../services/sWservices';
import TableLine from '../components/TableLine';

const SWProvider = ({ children }) => {
  const [planets, setplanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [searchControl, setSearchControl] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: 'Name',
        sort: 'ASC',
      },
    },
  });

  const rmFilterByNumeric = (newActiveFilters, newAvaliableFilters) => setSearchControl(
    {
      ...searchControl,
      filterByNumericValues: [...newActiveFilters],
      avaliableFilters: {
        ...searchControl.avaliableFilters, columnFilters: [...newAvaliableFilters],
      },
    },
  );

  const setFilterByName = (name) => {
    setSearchControl({
      filters: { ...searchControl.filters, filterByName: { name } },
    });
  };

  const setFilterByNumericValue = (filter) => {
    setSearchControl({
      filters: {
        ...searchControl.filters,
        filterByNumericValues: [
          ...searchControl.filters.filterByNumericValues,
          filter,
        ],
      },
    });
  };

  const filterPlanetName = (planet) => {
    if (planet.name.match(new RegExp(searchControl.filters.filterByName.name, 'i'))) {
      return true;
    }
    return false;
  };

  const filterByNumeric = (planet) => {
    console.log(planet);
    console.log(searchControl.filters.filterByNumericValues);
  };

  const filterPlanets = () => {
    setFilteredPlanets(
      planets.reduce((acc, planet) => {
        if (filterPlanetName(planet) && filterByNumeric(planet)) {
          acc.push(<TableLine planet={ planet } key={ planet.name } />);
        }
        return acc;
      }, []),
    );
  };

  const getPlanetSW = async () => {
    const planetSW = await fetchPlanetsAPI();
    setplanets(planetSW);
    setFilteredPlanets(planetSW.map((planet) => (
      <TableLine planet={ planet } key={ planet.name } />
    )));
  };

  useEffect(() => {
    getPlanetSW();
  }, []);

  useEffect(() => {
    filterPlanets();
  }, [searchControl]);

  const value = {
    filteredPlanets,
    setFilterByName,
    setFilterByNumericValue,
    searchControl,
    rmFilterByNumeric,
  };

  return <SWContext.Provider value={ value }>{children}</SWContext.Provider>;
};

export default SWProvider;

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
