import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import SearchStore from '../stores/SearchStore';
import SearchActions from '../actions/SearchActions';

export default class SearchTable extends Component {
  constructor () {
    super();

    this.state = {
      results: SearchStore.getSearchResults()
    };

    this._onChange = this._onChange.bind(this);
    this._sendBusinessId = this._sendBusinessId.bind(this);
  }

  componentWillMount () {
    SearchStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    SearchStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      results: SearchStore.getSearchResults()
    });
  }

  _sendBusinessId (id) {
    console.log('id: ', id);
    SearchActions.fetchBusinessResult(id);
    browserHistory.push(`${id}`);
  }

  render () {
    let { results } = this.state;
    let Results = [];
    if (results !== undefined) {
      Results = results.map((result, i) => {
        return (
          <div key={i} onClick={this._sendBusinessId.bind(null, result.id)} className='cardDiv'>
            <div className='col-xs-12'>
              <div className='col-xs-4'>
                <img src={result.image_url} alt='image2' />
              </div>
              <div className='col-xs-4'>
                <h3>{result.name}</h3>
                <h4>ID: {result.id}</h4>
              </div>
              <div className='col-xs-4'>
                <img src={result.rating_img_url} alt='image' />
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='col-xs-4'>
                {/* <h3>`Categories: {result.categories[0][0]}, {result.categories[1][0]}`</h3> */}
              </div>
            </div>
          </div>
        );
      });
    }
    console.log('results in table: ', results);
    return (
      <div>
        <h3>Table Here</h3>
        {Results}
      </div>
  );
  }
}
