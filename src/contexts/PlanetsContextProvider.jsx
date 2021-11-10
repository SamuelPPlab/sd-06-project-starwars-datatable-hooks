import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetFetcher from '../services/planetFetcher';

export const PlanetsContext = createContext();

const PlanetsContextProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    planetFetcher().then((data) => (setPlanets(data.results)));
  }, []);
  return (
    <PlanetsContext.Provider value={ { allPlanets: planets } }>
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsContextProvider.propTypes = {
  children: PropTypes.instanceOf(Object),
}.isRequired;

export default PlanetsContextProvider;
