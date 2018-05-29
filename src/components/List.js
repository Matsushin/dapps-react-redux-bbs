// @flow
import React, { Component } from 'react'
import Post from './Post'

class List extends Component {
	render() {
		const posts = this.props.posts;
		let postList = []
		for (let i in posts) {
			postList.push(<li key={i}><Post post={posts[i]} /></li>)
		}
		return (
			<div>
				<h3 className="title is-3">投稿一覧</h3>
				<ul>{postList}</ul>
			</div>
		)
	}
}

export default List