import { WEB3_CONNECTED, POST_ADDED, POST_CONTRACT_INSTANTIATED, POSTS_FETCHED, POST_FETCHED, defaultState } from '../actions';

const post = (state = defaultState, action) => {
  switch (action.type) {
  case WEB3_CONNECTED:
    return {
      ...state,
      web3: action.payload
    };
  case POST_CONTRACT_INSTANTIATED:
    return {
      ...state,
      postContract: action.payload
    };
  case POSTS_FETCHED:
    return {
      ...state,
      postIds: action.payload
    };
  case POST_FETCHED:
    return {
      ...state,
      post: action.payload
    };
  case POST_ADDED:
    return {
      ...state,
      postIds: [
        ...state.postIds,
        action.payload
      ]
    };
  default:
    return state
  }
};

export default post;