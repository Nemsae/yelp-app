import React, { Component } from 'react';

import SearchActions from '../actions/SearchActions';

export default class SearchForm extends Component {
  constructor () {
    super();

    this.state = {
      location: '',
      term: ''
    };

    this._grabLocation = this._grabLocation.bind(this);
    this._grabTerm = this._grabTerm.bind(this);
    this._getSearchResults = this._getSearchResults.bind(this);
  }

  _grabLocation (e) {
    let input = e.target.value;
    this.setState({
      location: input
    });
  }

  _grabTerm (e) {
    let input = e.target.value;
    this.setState({
      term: input
    });
  }

  _getSearchResults () {
    let { location, term } = this.state;
    if (location.length > 1) {
      location = location.split(' ').join('+');
    }
    let queryString = `?term=${term}&location=${location}`;
    console.log('queryString: ', queryString);
    SearchActions.fetchSearchResults(queryString);
  }

  render () {
    return (
      <div>
        <div className='form-group'>
          <label htmlFor='location'>Location:</label>
          <input onChange={this._grabLocation} type='text' className='form-control' id='location' />
        </div>
        <div className='form-group'>
          <label htmlFor='term'>Term:</label>
          <input onChange={this._grabTerm} type='text' className='form-control' id='term' />
        </div>
        <button onClick={this._getSearchResults} className='btn btn-default'>Search</button>
      </div>
    );
  }
}
