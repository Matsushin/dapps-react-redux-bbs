import Web3 from 'web3';
import contract from 'truffle-contract';
import PostTokenContract from '../..//build/contracts/PostToken.json';
export const WEB3_CONNECTED = 'WEB3_CONNECTED';
export const WEB3_DISCONNECTED = 'WEB3_DISCONNECTED';
export const POST_CONTRACT_INSTANTIATED = 'POST_CONTRACT_INSTANTIATED';
export const POSTS_FETCHED = 'POSTS_FETCHED';
export const POST_FETCHED = 'POST_FETCHED';
export const POST_ADDED = 'POST_ADDED';

export const defaultState = {
  web3: null,
  postIds: []
};

export function web3connect() {
  return (dispatch) => {
    const web3 = window.web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(web3.currentProvider)
      });
    } else {
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
      });
    }
  };
}


export function instantiatePostContract() {
  return (dispatch, getState) => {
    const web3 = getState().web3;
    const post = contract(PostTokenContract);
    post.setProvider(web3.currentProvider);
    return post.deployed().then((postContract) => {
      dispatch({
        type: POST_CONTRACT_INSTANTIATED,
        payload: postContract
      });
    });
  };
}

export function fetchPosts() {
  return (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const postContract = state.postContract;
    return postContract.getAllPosts().then((posts) => {
      dispatch({
        type: POSTS_FETCHED,
        payload: posts.map((post) => parseInt(post))
      });
    });
  };
}

export function fetchPost(payload) {
  return (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const postContract = state.postContract;
    return postContract.getPost(payload).then((results) => {
      const post = {
        "title": results[0].toString(),
        "content": results[1].toString(),
        "mintedBy": results[2].toString(),
        "mintedAt": results[3].toString()
      }
      dispatch({
        type: POST_FETCHED,
        payload: post
      });
    });
  };
}

export function addPost(title, content) {
  return (dispatch, getState) => {
    const web3 = getState().web3;
    const postContract = getState().postContract;
    web3.eth.getAccounts((err, accounts) => {
      postContract.mint(title, content, {
        from: accounts[0]
      }).then((results) => {
        dispatch({
          type: POST_ADDED,
          payload: { title: title, content: content }
        });
      });
    });
  };
}