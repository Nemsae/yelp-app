import AppDispatcher from '../AppDispatcher.js';
import API from '../API';

const SearchActions = {
  fetchSearchResults (queryString) {
    API.receiveSearchResults(queryString);
  },

  fetchBusinessResult (businessId) {
    API.receiveBusinessResult(businessId);
  },

  postFavorite (business) {
    API.postFavoriteBusiness(business);
  },

  fetchFavorites () {
    API.receiveFavorites();
  },

  removeFavorite (favorite) {
    console.log('favorite in Search ACtions: ', favorite);
    API.removeFavorite(favorite);
  }
};

export default SearchActions;
