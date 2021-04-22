import React, { useContext, useState } from 'react'
import './style.css';
import { SignInBtn } from '../../components'
import { UserContext } from '../../contexts/user';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { storage, db } from '../../firebase';
import makeId from '../../helper/functions';

import firebase from 'firebase';

export default function CreatePost() {

    const [user, setUser] = useContext(UserContext).user;
    const [caption, setCaption] = useState('');

    const [image, setImage] = useState(null);

    const [progress, setProgress] = useState(0);

    const handleChange = (e) => { 
        if (e.target.files[0]) {
            setImage(e.target.files[0]);

            let selectedImageSrc = URL.createObjectURL(e.target.files[0]);
            let imagePreview = document.getElementById('image-preview');
            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = "block";
        }
    }
    
    const handleUpload = () => { 
        if (image) {
            let imageName = makeId(10);
            const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);
            uploadTask.on('state_changed', (snapshot) => {
                // progress function
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);

            }, (error) => {
                console.log(error);
            }, () => {
                // get dnl url / upload post info
                    storage
                        .ref('images')
                        .child(`${imageName}.jpg`)
                        .getDownloadURL()
                        .then((imageUrl) => {
                        
                            db.collection('posts').add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                photoUrl: imageUrl,
                                username: user.email.replace('@gmail.com', ''),
                                profileUrl: user.photoUrl || null,
                            });
                        });
                    setCaption("");
                    setProgress(0);
                    setImage(null);
                    document.getElementById('image-preview').style.display = 'none;'
            });
        }
    };
    
    return (
        <div className="createPost">
            {user ? (
                <div className="createPost__loggedIn">
                    <p id="createHeading">Create Post</p>
                    <div className="createPost__loggedInCenter">
                        <textarea className="createPost__Text" 
                            row="3" placeholder="Enter caption here..." value={caption}
                            onChange={(e) => {
                                setCaption(e.target.value)
                            }}>
                        </textarea>
                        <div className="createPost__imagePreview">
                            <img id="image-preview" alt="" />
                        </div>
                    </div>
                    <div className="createPost__loggedInBottom">
                    <div className="createPost__imageUpload">
                        <label htmlFor="fileInput">
                        <AddAPhotoIcon style={{ cursor:'pointer', fontSize : '20px', color: 'black' }} />
                        </label>
                        <input id="fileInput" type="file" accept="image/*" onChange= {handleChange} />
                    </div>
                    <button className="createPost__uploadBtn" onClick={handleUpload} style={{ cursor: "pointer", color: caption ? "black" : "white"}}>
                        {`Upload ${progress != 0 ? progress : ''}`}
                        </button>
                    </div>
                </div>) : (
                    <div>
                        <SignInBtn />
                        <p id="infoPost">to Post & Comment</p>
                    </div>)}
        </div>
    );

}
