import React from 'react';
import InitialPage from './pages/InitialPage';
import PlanetsContextProvider from './contexts/PlanetsContextProvider';
import FilterContextProvider from './contexts/FilterContextProvider';

const App = () => (
  <FilterContextProvider>
    <PlanetsContextProvider>
      <InitialPage />
    </PlanetsContextProvider>
  </FilterContextProvider>
);

export default App;
