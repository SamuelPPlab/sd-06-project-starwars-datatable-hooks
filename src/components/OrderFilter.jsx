import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import { FilterContext } from '../contexts/FilterContextProvider';
import { numericColumns } from './NumericFilters';

const zero = 0;
const um = 1;
const umNegativo = -1;
const options = ['ASC', 'DESC'];
const columnsToOrder = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water', 'name', 'climate', 'gravity', 'terrain',
  'created', 'edited', 'films', 'url'];

const ascendentOrder = (a, b, column) => {
  const nameA = a[column].toUpperCase();
  const nameB = b[column].toUpperCase();
  if (nameA < nameB) {
    return um;
  }
  if (nameA > nameB) {
    return umNegativo;
  }
  return zero;
};

const descendantOrder = (a, b, column) => {
  const nameA = a[column].toUpperCase();
  const nameB = b[column].toUpperCase();
  if (nameA < nameB) {
    return umNegativo;
  }
  if (nameA > nameB) {
    return um;
  }
  return zero;
};

const orderSorter = (planets, order) => {
  const { sort, column } = order;
  let orderedPlanets;
  switch (sort) {
  case 'ASC':
    orderedPlanets = numericColumns.includes(column)
      ? planets.sort((a, b) => (
        (parseInt(b[column], 10) - parseInt(a[column], 10))))
      : orderedPlanets = planets.sort((a, b) => descendantOrder(a, b, column));
    break;
  case 'DESC':
    orderedPlanets = numericColumns.includes(column)
      ? orderedPlanets = planets.sort((a, b) => (
        (parseInt(b[column], 10) - parseInt(a[column], 10))))
      : planets.sort((a, b) => ascendentOrder(a, b, column));
    break;
  default:
  }
  return orderedPlanets;
};

const removeUnknown = (arrOriginal, column) => {
  // Função encontrada no stack Overflow e refatorada com o conteúdo que estamos usando no
  // momento.
  // link:
  // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
  const array = [...arrOriginal];
  let index = zero;
  while (index < array.length) {
    const item = array[index];
    if (item[column] === 'unknown') {
      array.splice(index, 1);
    } else {
      index += 1;
    }
  }
  return array;
};

const filterAll = (planets, name, numericFilter) => {
  let filteredPlanets = [...planets];
  if (name !== '') {
    filteredPlanets = filteredPlanets.filter((planet) => (planet.name.includes(name)));
  }

  if (numericFilter.length > zero) {
    numericFilter.forEach(({ value, comparison, column }) => {
      if (comparison === 'maior que') {
        filteredPlanets = removeUnknown(filteredPlanets, column);
        filteredPlanets = filteredPlanets.filter((planeta) => (
          (parseInt(planeta[column], 10) > parseInt(value, 10))));
      }
      if (comparison === 'menor que') {
        filteredPlanets = removeUnknown(filteredPlanets, column);
        filteredPlanets = filteredPlanets.filter((planeta) => (
          (parseInt(planeta[column], 10) < parseInt(value, 10))));
      }
      if (comparison === 'igual a') {
        filteredPlanets = removeUnknown(filteredPlanets, column);
        filteredPlanets = filteredPlanets
          .filter((planeta) => (planeta[column] === value));
      }
    });
  }
  return filteredPlanets;
};

const OrderFilter = ({ allPlanets, nameProp, filterByNumericValuesProp, orderProp }) => {
  const [currentPlanets, setCurrentPlanets] = useState(
    orderSorter(filterAll(allPlanets, nameProp, filterByNumericValuesProp), orderProp),
  );
  useEffect(() => {
    setCurrentPlanets(orderSorter(filterAll(allPlanets, nameProp,
      filterByNumericValuesProp), orderProp));
  }, [nameProp, filterByNumericValuesProp]);

  return (
    <FilterContext.Consumer>
      {({ allFilters, setAllFilters }) => {
        const { filters: { order, filterByNumericValues, filterByName } } = allFilters;
        const { name } = filterByName;
        const { column, sort } = order;
        return (
          <div>
            <select
              data-testid="column-sort"
              onChange={ ({ target: { value } }) => {
                setAllFilters({ filters: { filterByName,
                  filterByNumericValues,
                  order: { column: value, sort } } });
              } }
            >
              {
                columnsToOrder.map((optionColumn) => (
                  <option selected={ optionColumn === column } key={ optionColumn }>
                    {optionColumn}
                  </option>
                ))
              }
            </select>
            {
              options.map((option) => (
                <label
                  key={ option }
                  htmlFor={ option }
                >
                  <input
                    data-testid={ `column-sort-input-${option.toLowerCase()}` }
                    type="radio"
                    value={ option }
                    checked={ sort === option }
                    onClick={ ({ target: { value } }) => {
                      setAllFilters({ filters: { filterByName,
                        filterByNumericValues,
                        order: { column, sort: value } } });
                    } }
                    id={ option }
                  />
                  {option}
                </label>
              ))
            }
            <button
              type="button"
              onClick={ () => {
                setCurrentPlanets(orderSorter(filterAll(allPlanets, name,
                  filterByNumericValues), order));
              } }
              data-testid="column-sort-button"
            >
              Filtrar
            </button>
            <Table planets={ currentPlanets } />
          </div>
        );
      }}
    </FilterContext.Consumer>
  );
};

OrderFilter.propTypes = {
  allPlanets: PropTypes.instanceOf(Array),
  nameProp: PropTypes.string,
  filterByNumericValuesProp: PropTypes.instanceOf(Array),
  orderProp: PropTypes.instanceOf(Object),
}.isRequired;

export default OrderFilter;
