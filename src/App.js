import React, { Component } from 'react'
import { connect } from 'react-redux'
import contract from 'truffle-contract'
import {web3connect, fetchTodos, fetchPosts, fetchPost, addTodo, addPost, instantiateTodoContract, instantiatePostContract} from './actions';
import moment from 'moment'
import Moment from 'react-moment'

import './css/pure-min.css'
import './App.css'
import '../node_modules/bulma/css/bulma.min.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      textarea: '',
      title: '',
      content: '',
      posts: []
    }
    this.onChange = this.onChange.bind(this)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.renderTodos.bind(this);
    this.renderPosts.bind(this);
    this.updatePosts.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See actions/index.js => web3connect for more info.
    window.addEventListener('load', () => {
      this.props.web3connect();
      this.props.instantiateTodoContract().then(() => {
        this.props.fetchTodos();
      });
      this.props.instantiatePostContract().then(() => {
        this.updatePosts()
      });
    });
  }

  onChange(event) {
    this.setState({ title: event.target.value })
  }

  onTextAreaChange(event) {
    this.setState({ content: event.target.value })
  }

  handleTextAreaChange(event) {
    this.setState({
      textarea: event.target.value
    });
  }
  renderTodos(todos) {
    return todos.map((todo, i) => {
      return (
        <li key={i}>{todo}</li>
      );
    })
  }

  updatePosts() {
    this.props.fetchPosts().then(() => {
      let posts = []
      this.props.postIds.map((postId, i) => {
        this.props.fetchPost(postId).then(() => {
          posts.unshift(this.props.post)
          this.setState({ posts: posts })
        });
      });
    });
  }

  renderPosts(posts) {
    let postList = []
    for (let i in posts) {
      postList.push(
        <li key={i}>
          <div className="post-container">
            <article className="box media">
              <div className="media-content">
                <div className="content">
                    <p>
                      <strong>{posts[i].title}</strong><br />
                      {posts[i].content.split("\n").map((m, index) => {
                return <span key={index}>{m}<br/></span>
              })}
                    </p>
                    <small className="is-pulled-right"><Moment unix format="YYYY/MM/DD HH:mm:ss">{posts[i].mintedAt}</Moment></small>
                  </div>
                </div>
            </article>
          </div>
        </li>
      )
    }
    return (
      <div>
        <h3 className="title is-3">投稿一覧</h3>
        <ul>{postList}</ul>
      </div>
    )
  }

  addTodo() {
    this.props.addTodo(this.state.textarea);
  }

  addPost() {
    this.props.addPost(this.state.title, this.state.content)
    const post = {
      "title": this.state.title,
      "content": this.state.content
    }
    let posts = this.state.posts
    posts.unshift(post)
    this.setState({ posts: posts })
  }

  render() {
    if (!this.props.web3) {
      return (
        <div> Loading web3 </div>
      );
    }
    return (
      <div className="App">
        <div className="hero is-info is-bold">
            <div className="hero-body">
              <div className="container">
              <h1 className="title">Decentralized BBS</h1>
              <h2 className="subtitle">匿名掲示板</h2>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <h3 className="title is-3">投稿フォーム</h3>
            <div className="columns">
              <div className="column is-half box">
                <div className="field">
                  <label className="label">タイトル</label>
                  <div className="control">
                    <input className="input" type="text" value={this.state.title} onChange={this.onChange}  />
                  </div>
                </div>
                <div className="field">
                  <label className="label">本文</label>
                  <div className="control">
                    <textarea className="textarea" onChange={this.onTextAreaChange} value={this.state.content}></textarea>
                  </div>
                </div>
                <button className="button is-primary" onClick={this.addPost.bind(this)} value="投稿する" >投稿する</button>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            {this.renderPosts(this.state.posts)}
          </div>
        </div>
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Todos</h1>
              <textarea id="textarea" value={this.state.textarea} onChange={this.handleTextAreaChange.bind(this)} />
              <button onClick={this.addTodo.bind(this)}>Add Todo</button>
              <ul>
                {this.renderTodos(this.props.todos)}
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = {
  web3connect,
  instantiateTodoContract,
  instantiatePostContract,
  fetchTodos,
  fetchPosts,
  fetchPost,
  addTodo,
  addPost
};

const mapStateToProps = (state) => ({
  web3: state.web3,
  todos: state.todos,
  postIds: state.postIds,
  post: state.post
});

export default connect(mapStateToProps, mapDispatchToProps)(App);