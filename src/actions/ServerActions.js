import AppDispatcher from '../AppDispatcher.js';
import API from '../API';

const ServerActions = {
  sendSearchResults (results) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_SEARCH_RESULTS',
      payload: { results }
    });
  },

  sendBusinessResult (result) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_BUSINESS_RESULT',
      payload: { result }
    });
  },

  sendFavorites (favorites) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_FAVORITES',
      payload: { favorites }
    });
  }
};

export default ServerActions;
