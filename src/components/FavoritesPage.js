import React, { Component } from 'react';

import SearchStore from '../stores/SearchStore';
import SearchActions from '../actions/SearchActions';

export default class FavoritesPage extends Component {
  constructor () {
    super();

    this.state = {
      favorites: SearchStore.getFavorites()
    };

    this._onChange = this._onChange.bind(this);
    this._removeFavorite = this._removeFavorite.bind(this);
  }

  componentWillMount () {
    SearchActions.fetchFavorites();
    SearchStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    SearchStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      favorites: SearchStore.getFavorites()
    });
  }

  _removeFavorite (favorite) {
    console.log('favorite2: ', favorite);
    SearchActions.removeFavorite(favorite);
  }

  render () {
    let { favorites } = this.state;
    let Favorites = [];
    console.log('favorites in favpage: ', favorites);
    if (favorites !== undefined) {
      Favorites = favorites.data.map((favorite, i) => {
        console.log('favorite000: ', favorite);
        return (
          <div key={i}>
            <h1>{favorite.name}</h1>
            <h4>{favorite.phone}</h4>
            <img src={favorite.rating_img_url} />
            <h4>{favorite.rating} out of 5 stars</h4>
            <h3>{favorite.location.address[0]}</h3>
            <h3>{favorite.location.city}</h3>
            <h3>{favorite.location.state_code}, {favorite.location.postal_code}</h3>
            <button onClick={this._removeFavorite.bind(null, favorite)} className='btn btn-danger'>Delete</button>
          </div>
        );
      });
    }
    return (
      <div className='text-center'>
        <h1>Favorites</h1>
        {Favorites}
      </div>
    );
  }
}
