// @flow
import React, { Component } from 'react'
import Moment from 'react-moment'

class Post extends Component {
	render() {
        return (
        	<div className="post-container">
	            <article className="box media">
	            	<div className="media-content">
	            		<div className="content">
			                <p>
			                	<strong>{this.props.post.title}</strong><br />
			                	{this.props.post.content.split("\n").map((m, index) => {
								  return <span key={index}>{m}<br/></span>
								})}
			                </p>
			                <small className="is-pulled-right"><Moment unix format="YYYY/MM/DD HH:mm:ss">{this.props.post.mintedAt}</Moment></small>
		                </div>
	                </div>
	            </article>
            </div>
        );
    }
}

export default Post