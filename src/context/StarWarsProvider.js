import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetsInfo from '../services/apiServices';
import removeKeyFromObject from '../helpers/removeKeyFromObject';
// import mockFetchPlanetsInfo from '../services/mockApiServices';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [hasNumericFilters, setHasNumericFilters] = useState(false);

  const initialFiltersState = {
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  };
  const [filters, setFilters] = useState(initialFiltersState);
  const [columnFilters, setColumnFilters] = useState(
    [
      'population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water',
    ],
  );
  const comparisonFilters = ['maior que', 'menor que', 'igual a'];

  const getPlanetsInfo = async () => {
    const planetsInfo = await fetchPlanetsInfo();
    const planetsWithoutResidentsKey = planetsInfo.map((planet) => (
      removeKeyFromObject(planet, 'residents')
    ));
    return planetsWithoutResidentsKey;
  };

  const makeInitialSetup = async () => {
    // console.log("Retrieving API info")
    const planetsInfo = await getPlanetsInfo();
    // console.log('Request response:', planetsInfo);
    setData(planetsInfo);
    setTableHeaders(Object.keys(planetsInfo[0]));
    setIsFetching(false);
  };

  const getFilteredPlanets = () => {
    let dataForFiltering = [...data];
    let auxFilter;
    const { filters: { filterByName: { name: planetSearch } } } = filters;
    const { filters: { filterByNumericValues } } = filters;
    if (hasNumericFilters) {
      filterByNumericValues.forEach((currentFilter) => {
        const { column, comparison, value } = currentFilter;
        switch (comparison) {
        case 'maior que':
          auxFilter = dataForFiltering.filter((planet) => (
            Number(planet[column]) > value
          ));
          dataForFiltering = [...auxFilter];
          break;
        case 'menor que':
          auxFilter = dataForFiltering.filter((planet) => (
            Number(planet[column]) < value
          ));
          dataForFiltering = [...auxFilter];
          break;
        case 'igual a':
          auxFilter = dataForFiltering.filter((planet) => (
            Number(planet[column]) === value
          ));
          dataForFiltering = [...auxFilter];
          break;
        default:
          console.log('Ocorreu um erro na informação de comparação');
        }
      });
    }

    return dataForFiltering.filter((planet) => (
      planet.name.toLowerCase().includes(planetSearch.toLowerCase())
    ));
  };

  const applyFilter = (filterToApply) => {
    setFilters((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        filterByNumericValues: [
          ...prevState.filters.filterByNumericValues,
          filterToApply,
        ],
      },
    }));
  };

  useEffect(() => {
    makeInitialSetup();
    // mockedInitialSetup();
  }, []);

  useEffect(() => {
    const { filters: { filterByNumericValues } } = filters;
    const minArraySize = 0;
    console.log('Filters foi alterado');
    setHasNumericFilters(filterByNumericValues.length > minArraySize);
    console.log('Ptovider filters state:', filterByNumericValues);
  }, [filters]);
  const contextValue = {
    tableHeaders,
    isFetching,
    filters,
    columnFilters,
    comparisonFilters,
    getFilteredPlanets,
    setFilters,
    setColumnFilters,
    applyFilter,
    // mockedInitialSetup,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;

/*
  IN CASE OF API FAILURE
  // Remova depois que a API retornar
  const getMockedPlanetsInfo = async () => {
    const planetsInfo = mockFetchPlanetsInfo();
    const planetsWithoutResidentsKey = planetsInfo.map((planet) => (
      removeKeyFromObject(planet, 'residents')
    ));
    return planetsWithoutResidentsKey;
  };

  // Remova depois que a API retornar
  const mockedInitialSetup = async () => {
    console.log('Retrieving API info');
    const planetsInfo = await getMockedPlanetsInfo();
    console.log('Request response:', planetsInfo);
    setData(planetsInfo);
    setTableHeaders(Object.keys(planetsInfo[0]));
    setIsFetching(false);
  };
  */
