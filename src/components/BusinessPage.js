import React, { Component } from 'react';

// import SearchTable from './SearchTable';
// import SearchForm from './SearchForm';
import SearchStore from '../stores/SearchStore';
import SearchActions from '../actions/SearchActions';

export default class BusinessPage extends Component {
  constructor () {
    super();

    this.state = {
      business: SearchStore.getBusinessResult()
    };

    this._onChange = this._onChange.bind(this);
    this._addFavorite = this._addFavorite.bind(this);
  }

  componentWillMount () {
    SearchStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    SearchStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      business: SearchStore.getBusinessResult()
    });
  }

  _addFavorite (business) {
    console.log('business2: ', business);
    SearchActions.postFavorite(business);
  }

  render () {
    let { business } = this.state;
    let Business = [];
    if (business !== undefined) {
      Business = (
        <div>
          <h1>{business.name}</h1>
          <h4>{business.phone}</h4>
          <img src={business.rating_img_url} />
          <h4>{business.rating} out of 5 stars</h4>
          <h3>{business.location.address[0]}</h3>
          <h3>{business.location.city}</h3>
          <h3>{business.location.state_code}, {business.location.postal_code}</h3>
          <button onClick={this._addFavorite.bind(null, business)} className='btn btn-default'>Favorite!</button>
        </div>
      );
    }
    console.log('business: ', business);
    return (
      <div className='text-center'>
        {Business}
      </div>
    );
  }
}
