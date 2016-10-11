import React, { Component } from 'react';

import SearchTable from './SearchTable';
import SearchForm from './SearchForm';

export default class SearchPage extends Component {

  render () {
    return (
      <div className='text-center'>
        <h1>Search Page</h1>
        <div className='row'>
          <SearchForm />
        </div>
        <div className='row'>
          <SearchTable />
        </div>
      </div>
    );
  }
}
