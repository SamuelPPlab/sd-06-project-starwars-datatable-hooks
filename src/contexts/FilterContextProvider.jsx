import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const filters = {
  filters: {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  },
};

export const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
  const [allFilters, setAllFilters] = useState(filters);
  return (
    <FilterContext.Provider value={ { allFilters, setAllFilters } }>
      { children }
    </FilterContext.Provider>
  );
};

FilterContextProvider.propTypes = {
  children: PropTypes.instanceOf(Object),
}.isRequired;

export default FilterContextProvider;
