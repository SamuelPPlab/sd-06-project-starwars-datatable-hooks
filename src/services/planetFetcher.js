const planetFetcher = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/').then(
    (data) => (data.json()),
    (error) => (error),
  );
  return (response);
};

export default planetFetcher;
