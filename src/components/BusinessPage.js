import React, { Component } from 'react';

// import SearchTable from './SearchTable';
// import SearchForm from './SearchForm';
import SearchStore from '../stores/SearchStore';

export default class BusinessPage extends Component {
  constructor () {
    super();

    this.state = {
      business: SearchStore.getBusinessResult()
    };

    this._onChange = this._onChange.bind(this);
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
  render () {
    let { business } = this.state;
    let Business = [];
    if (business !== undefined) {
      Business = (
        <div>
          <h1>{business.name}</h1>
          <h4>{business.phone}</h4>
          <img src={business.rating_img_url} />
          <h4>{business.rating}</h4>
          {/* <h3>{business.location.address[0]}</h3> */}
          <h3>{business.location.city}</h3>
          <h3>{business.location.state_code}, {business.location.postal_code}</h3>
        </div>
      );
    }
    console.log('business: ', business);
    return (
      <div className='text-center'>
        <h1>Business Page</h1>
        <div>
          {Business}
        </div>
      </div>
    );
  }
}
