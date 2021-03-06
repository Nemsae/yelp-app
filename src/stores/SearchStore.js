import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';

let _searchResults = undefined;
let _businessResult = undefined;
let _favorites = undefined;

class SearchStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      let { type, payload } = action;
      switch (type) {
        case 'RECEIVE_SEARCH_RESULTS': {
          _searchResults = payload.results;
          console.log('_searchResults in store: ', _searchResults);
          this.emit('CHANGE');
          break;
        }
        case 'RECEIVE_BUSINESS_RESULT': {
          _businessResult = payload.result;
          this.emit('CHANGE');
          break;
        }
        case 'RECEIVE_FAVORITES': {
          _favorites = payload.favorites;
          console.log('_favorites in store: ', _favorites);
          this.emit('CHANGE');
          break;
        }
      }
    });
  }

  startListening (cb) {
    this.on('CHANGE', cb);
  }

  stopListening (cb) {
    this.removeListener('CHANGE', cb);
  }

  getSearchResults () {
    return _searchResults;
  }

  getBusinessResult () {
    return _businessResult;
  }

  getFavorites () {
    return _favorites;
  }
}

export default new SearchStore();
