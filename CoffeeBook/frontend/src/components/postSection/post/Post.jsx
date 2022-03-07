import React, { Component } from 'react'
import './post.css'

export default class Post extends Component {

    render() {
        return (
            <div className='d-flex flex-row justify-content-around'>
                <div className="input-group w40 ">
                    <span className="input-group-text" id="basic-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </span>
                    <input onChange={this.props.getPostsWithKeyword} type="text" className="form-control inputPost" placeholder="Recherchez un post" aria-label="Input group example" aria-describedby="basic-addon1" />
                </div>
                <div className='addPost w40' onClick={this.props.createNewPost} role='button'>
                    {this.props.createNewPostStatus ? 
                    (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>):
                    (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>) 
                    }
                    <span >{this.props.createNewPostStatus ? 'Fermer' : 'Nouveau Post'}</span>
                </div>
            </div>
        )
    }
}
