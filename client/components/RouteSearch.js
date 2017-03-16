import React from 'react';
import { Link } from 'react-router';
import SearchAdvanced from './SearchAdvanced';
import SearchBoxes from './SearchBoxes';
import SearchButton from './SearchButton';

const RouteSearch = () => (
  <div id="route-search">
    <h1 id="title-large">ROUTE to GO</h1>
    <h2 id="site-description">Find all possible flight routes between two cities.</h2>
    <SearchBoxes />
    <SearchAdvanced />
    <SearchButton />
    <Link to="Routes">RouteSearch</Link></div>
);

export default RouteSearch;
