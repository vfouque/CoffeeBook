import React from 'react'
import { BsPencilFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import Rating from '../rating/Rating'
import '../actualites/actualites.css'

export default function PostActu({ post }) {
    return (
        <div className="postActu">
            {/* TODO fix categories list for each post in feed */}
            {/* {
                post.postCategory.length
                    ? <div>{post.postCategory.map(c => <span style={{ "marginRight": "8px" }} key={c.id}>{c.name}</span>)}</div>
                    : ""
            } */}
            <div className="postActuHeader">
                <p>{post.postUser.firstName} {post.postUser.lastName}<button className='btnSuivre'>suivre l'auteur</button></p>
                <div className="icones">
                    <BsPencilFill />
                    <AiOutlineHeart />
                    <div className="nav-item dropdown">
                        <a className="nav-link gearAppearance" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><BsFillPlusCircleFill /></a>
                        <ul className="dropdown-menu menuParameter">
                            <li className='d-flex justify-content-start align-items-center ml-2'><a className="dropdown-item" href="#"><FiAlertTriangle />Signaler le post</a></li>
                            <li className='d-flex justify-content-start align-items-center'><a className="dropdown-item" href="#"><ImCross />Supprimer le post</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="main">
                <div className="postTitle">{post.title}</div>
                <div className="postcontent">
                    <img src="" alt="" />
                    <div className="postComment">{post.content}</div>
                </div>
                <div>
                    <Rating voteAvg={post.voteAvg}/>
                </div>
            </div>
        </div>
    )
}
