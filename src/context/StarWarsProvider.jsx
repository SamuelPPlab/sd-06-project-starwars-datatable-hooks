import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsAPI from '../service/StarWarsApi';
import StarWarsContext from './StarWarsContext';

function StarWarProvider({ children }) {
  const [data, setData] = useState([]); // Api
  const [byValue, setByValue] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    {
      filters:
      {
        filterByName:
        {
          name: '',
        },
        filterByNumericValues: [],
        order: {
          column: 'name',
          sort: 'ASC',
        },
      },
    },
  );

  const dataApi = async () => {
    const dataResponse = await StarWarsAPI();
    setData(dataResponse);
  };

  const value = {
    data,
    dataApi,
    searchTerm,
    setSearchTerm,
    byValue,
    setByValue,
  };

  return (
    <StarWarsContext.Provider value={ value }>
      { children}
    </StarWarsContext.Provider>
  );
}

StarWarProvider.propTypes = PropTypes.arrayOf(PropTypes.string).isRequired;

export default StarWarProvider;
