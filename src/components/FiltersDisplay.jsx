import React from 'react';
import { FilterContext } from '../contexts/FilterContextProvider';

const filterRemover = (itemToRemove, filterByNumericValues) => (
  filterByNumericValues.filter((filter) => (filter !== itemToRemove)));

const FiltersDisplay = () => (
  <FilterContext.Consumer>
    {({ allFilters: { filters: { filterByNumericValues, filterByName,
      order } }, setAllFilters }) => (
      filterByNumericValues.map((item) => {
        const { column, value, comparison } = item;
        return (
          <div data-testid="filter" key={ item }>
            { `${column}, ${value}, ${comparison}` }
            <button
              type="button"
              onClick={ () => {
                setAllFilters({ filters: { filterByName,
                  filterByNumericValues: filterRemover(item, filterByNumericValues),
                  order } });
              } }
            >
              X
            </button>
          </div>
        );
      })
    )}
  </FilterContext.Consumer>
);

export default FiltersDisplay;
