import React from 'react';

const SearchAdvanced = () => (
  <div>Advanced Search Options</div>
);

SearchAdvanced.propTypes = {
  advancedOptions: React.PropTypes.shape({
    alliance: React.PropTypes.string,
  }).isRequired,
};

export default SearchAdvanced;
