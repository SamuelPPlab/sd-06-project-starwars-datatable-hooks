import React from 'react';
import PropTypes from 'prop-types';
import { FilterContext } from '../contexts/FilterContextProvider';

const TextFilter = () => (
  <FilterContext.Consumer>
    { ({ allFilters, setAllFilters }) => (
      <div>
        Buscar:
        <input
          type="text"
          onChange={ ({ target: { value } }) => setAllFilters({ filters:
            { filterByName: { name: value },
              order: allFilters.filters.order,
              filterByNumericValues: allFilters.filters.filterByNumericValues } }) }
          data-testid="name-filter"
          value={ allFilters.filters.filterByName.name }
        />
      </div>
    ) }
  </FilterContext.Consumer>
);

TextFilter.propTypes = {
  onChange: PropTypes.func,
}.isRequired;

export default TextFilter;
