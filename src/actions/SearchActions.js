import AppDispatcher from '../AppDispatcher.js';
import API from '../API';

const SearchActions = {
  fetchSearchResults (queryString) {
    API.receiveSearchResults(queryString);
  },

  fetchBusinessResult (businessId) {
    API.receiveBusinessResult(businessId);
  }
};

export default SearchActions;
