import React from 'react';

const SearchAdvanced = () => (
  <div>Advanced Search Options</div>
);

SearchAdvanced.defaultProps = {
  advancedOptions: {
    alliance: '',
    numStops: 1,
  },
};

SearchAdvanced.propTypes = {
  advancedOptions: React.PropTypes.shape({
    alliance: React.PropTypes.string,
    numStops: React.PropTypes.number,
  }).isRequired,
  onAdvancedOptionsInput: React.PropTypes.func.isRequired,
};

export default SearchAdvanced;
