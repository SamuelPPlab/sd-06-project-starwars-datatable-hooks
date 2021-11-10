import React from 'react';
import TextFilter from '../components/TextFilter';
import NumericFilters from '../components/NumericFilters';
import FiltersDisplay from '../components/FiltersDisplay';
import OrderFilter from '../components/OrderFilter';
import { PlanetsContext } from '../contexts/PlanetsContextProvider';
import { FilterContext } from '../contexts/FilterContextProvider';

const InitialPage = () => (
  <FilterContext.Consumer>
    {
      ({ allFilters }) => {
        const { filters: { filterByName, filterByNumericValues, order } } = allFilters;
        const { name } = filterByName;
        return (
          <PlanetsContext.Consumer>
            {({ allPlanets }) => {
              const zero = 0;
              if (allPlanets.length === zero) return <div>Loading</div>;
              return (
                <div>
                  <TextFilter />
                  <NumericFilters />
                  <FiltersDisplay />
                  <OrderFilter
                    allPlanets={ allPlanets }
                    nameProp={ name }
                    filterByNumericValuesProp={ filterByNumericValues }
                    orderProp={ order }
                  />
                </div>
              );
            }}
          </PlanetsContext.Consumer>
        );
      }
    }
  </FilterContext.Consumer>
);

export default InitialPage;
