import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../StarWarsContext';
import fetchPlanets from '../../services/fetchPlanets';

function StarWarsProvider({ children }) {
  const [fetchedPlanets, setFetchedPlanets] = useState([]);
  const [tableHeaders, setTableHeader] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [currentPlanets, setCurrentPlanets] = useState([]);

  useEffect(() => {
    const fetchAndSavePlanets = async () => {
      const data = await fetchPlanets();

      setFetchedPlanets(data.results);
      setTableHeader(Object.keys(data.results[0])
        .filter((header) => header !== 'residents'));
    };
    fetchAndSavePlanets();
  }, []);

  useEffect(() => {
    const regex = new RegExp(nameFilter, 'i');
    const filteredPlanets = fetchedPlanets.filter((planet) => regex.test(planet.name));
    setCurrentPlanets(filteredPlanets);
  }, [fetchedPlanets, nameFilter]);

  const context = {
    currentPlanets,
    tableHeaders,
    setNameFilter,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default StarWarsProvider;