import {GET_PHRASE} from '../actions/types';

function phrasesReducer(state = {phrase: 'aaa'}, action) {
  switch (action.type) {
    case GET_PHRASE:
      return {phrase: 'bbb'};
    default:
      return state;
  }

}

export default phrasesReducer;
