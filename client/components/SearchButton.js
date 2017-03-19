import React, { Component } from 'react';

class SearchButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSubmit();
  }

  render() {
    return (
      <button id="route-search-button" onClick={this.handleClick}>Find Routes</button>
    );
  }
}

SearchButton.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};

export default SearchButton;
