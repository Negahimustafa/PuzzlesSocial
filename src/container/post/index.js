import React, { useState, useContext } from 'react'
import { Comment } from '../../components';
import CommentInput from '../../components/comment-input';
import { UserContext } from '../../contexts/user';
import { db, storage } from '../../firebase';
import './style.css';

export default function Post({ profileUrl, username, id, photoUrl, caption, comments }) {
    
    const [user, setUser] = useContext(UserContext).user;

    const deletePost = () => {
        //Delete img from firebase storage
        let imageRef = storage.refFromURL(photoUrl);
        //delete file
        imageRef.delete().then(function () {
            console.log("Delete successfull");
        }).catch(function (error) {
            console.log(`Error ${error}`);
        });

        //Delete post info from firebase firestore
        db.collection("posts").doc(id).delete()
        .then(function () {
            console.log("Delete post successfull");
        }).catch(function (error) {
            console.log(`Error post info delete ${error}`);
        });
    }

    return (

        <div className="post">
            <div className="post__header">
                <div className="post__headerLeft">
                <img className="post__profilePic" src={profileUrl} />
                <p style={{marginLeft: "10px", color: "black"}}>{username}</p>
               </div>
                <button onClick={deletePost} className="post__delete">Delete</button> 
            </div>

            <div className="post__center">
                    <img className="post__img" src={photoUrl} />
            </div>

            <div>
                <p><span style={{fontWeight: "600", color:"black", marginRight: "9px"}}>{username} :</span>{caption}</p>
            </div>

            {comments ? comments.map((comment) => <Comment username={comment.username} caption={comment.comment} />
            ) : <></>}

            {user ? <CommentInput comments={comments} id={id} /> : <></>}
            
        </div>
    )
}
