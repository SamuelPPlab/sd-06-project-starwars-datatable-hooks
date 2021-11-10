import React from 'react';
import PropTypes from 'prop-types';
import TableLine from './TableLine';

const Tabela = ({ planets }) => (
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Dia</th>
        <th>Ano</th>
        <th>Diâmetro</th>
        <th>Clima</th>
        <th>Gravidade</th>
        <th>Terreno</th>
        <th>Agua na Superfície</th>
        <th>População</th>
        <th>Criado</th>
        <th>Editado</th>
        <th>Filmes</th>
        <th>URL</th>
      </tr>
    </thead>
    <tbody>
      {planets.map((planet) => (<TableLine planet={ planet } key={ planet.name } />))}
    </tbody>
  </table>
);

Tabela.propTypes = {
  planets: PropTypes.instanceOf(Array),
}.isRequired;

export default Tabela;
