export default function StarWarsAPI() {
  return fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((results) => results.json())
    .then((data) => data.results);
}