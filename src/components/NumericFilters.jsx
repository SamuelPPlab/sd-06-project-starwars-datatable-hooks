import React, { useState } from 'react';
import { FilterContext } from '../contexts/FilterContextProvider';

export const numericColumns = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];
const comparisons = ['menor que', 'maior que', 'igual a'];
const inicialState = { column: 'population', comparison: 'maior que', value: 0 };
const zero = 0;

const repeatedOptionRemover = (selectedColumns) => {
  const columns = selectedColumns.map(({ column }) => column);
  return (numericColumns.filter((column) => columns.indexOf(column) < zero));
};

const NumericFilters = () => {
  const [filterCompiler, setFilterCompiler] = useState(inicialState);
  const { column, comparison, value } = filterCompiler;
  return (
    <FilterContext.Consumer>
      {({ setAllFilters, allFilters }) => {
        const { filters: { filterByName, filterByNumericValues, order } } = allFilters;
        return (
          <div>
            <select
              data-testid="column-filter"
              onChange={ ({ target }) => {
                setFilterCompiler({ ...filterCompiler, column: target.value });
              } }
            >
              { repeatedOptionRemover(filterByNumericValues).map((numColumn) => (
                <option selected={ column === numColumn } key={ numColumn }>
                  {numColumn}
                </option>
              )) }
            </select>
            <select
              data-testid="comparison-filter"
              onChange={ ({ target }) => {
                setFilterCompiler({ ...filterCompiler, comparison: target.value });
              } }
            >
              { comparisons.map((arrayComparison) => (
                <option
                  selected={ arrayComparison === comparison }
                  key={ arrayComparison }
                >
                  {arrayComparison}
                </option>
              )) }
            </select>
            <input
              type="number"
              data-testid="value-filter"
              value={ value }
              onChange={ ({ target }) => {
                setFilterCompiler({ ...filterCompiler, value: target.value });
              } }
            />
            <button
              type="button"
              data-testid="button-filter"
              onClick={ () => setAllFilters({ filters: { filterByName,
                order,
                filterByNumericValues: [...filterByNumericValues, filterCompiler] } }) }
            >
              Filtrar
            </button>
          </div>
        );
      }}
    </FilterContext.Consumer>
  );
};

export default NumericFilters;
