import { WEB3_CONNECTED, TODO_ADDED, POST_ADDED, TODOS_CONTRACT_INSTANTIATED, POST_CONTRACT_INSTANTIATED, TODOS_FETCHED, POSTS_FETCHED, POST_FETCHED, defaultState } from '../actions';

const todos = (state = defaultState, action) => {
  switch (action.type) {
  case WEB3_CONNECTED:
    return {
      ...state,
      web3: action.payload
    };
  case TODOS_CONTRACT_INSTANTIATED:
    return {
      ...state,
      todosContract: action.payload
    };
  case POST_CONTRACT_INSTANTIATED:
    return {
      ...state,
      postContract: action.payload
    };
  case TODOS_FETCHED:
    return {
      ...state,
      todos: action.payload
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
  case TODO_ADDED:
    return {
      ...state,
      todos: [
        ...state.todos,
        action.payload
      ]
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

export default todos;
//export default post;