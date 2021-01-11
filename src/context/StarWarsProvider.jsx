import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchPlanetList from '../services/starWarsService';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState({});
  const [filters, setFilters] = useState({
    filterByNumericValues: [{
      column: '',
      comparison: '',
      value: 0,
    }],
  });

  const filterByNumber = (column, comparison, value) => {
    setFilters({
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });
  };

  const getPlanetList = async () => {
    const planetList = await fetchPlanetList();
    setData(planetList);
  };

  const context = {
    data,
    getPlanetList,
    searchTerm,
    setSearchTerm,
    filters,
    filterByNumber,
    sort,
    setSort,
  };

  return (
    <StarWarsContext.Provider value={ { context } }>
      {children}
    </StarWarsContext.Provider>
  );
}
// thread do Ricardo Roa no slack falando sobre o tipo da props
StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
