import React, { useState, useContext } from 'react'
import { storage, db } from "./fire";
import Context from './Context';
import demo from './demo.png'
import "./App.css"

const Posts = () => {

    const value = useContext(Context)
    let img = value.gimg;
    let name = value.gname;

    const [image, setImage] = useState('');
    const [inputField, setInputField] = useState({
        title: "",
        thoughts: "",
    })

    const [item, setItem] = useState([]);

    const { title, thoughts } = inputField;
    const onChange = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        let id = value.google;
        console.log(id)

        e.preventDefault();

        if (id) {

            if (!title || !thoughts) {
                alert("dont't be blank");
            }
            else {
                setItem((oldItems) => {
                    return [...oldItems, inputField]
                })

                setInputField({
                    title: "",
                    thoughts: "",
                })
            }

            // Sending File to Firebase Storage
            storage.ref(`/images/${image.name}`).put(image)
                .on("state_changed", alert("success"), alert, () => {

                    // Getting Download Link
                    storage.ref("images").child(image.name).getDownloadURL()
                        .then((url) => {
                            console.log("My Url Is " + url);
                            db.collection(id).add({
                                name: image.name,
                                imgUrl: url,
                                title: title,
                                userImg: img,
                                userName: name,
                                thoughts: thoughts,
                            }).then(function () {
                                console.log("Document successfully written!");
                            })
                                .catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });
                            db.collection("User-Data").add({
                                name: image.name,
                                imgUrl: url,
                                title: title,
                                userImg: img,
                                userName: name,
                                thoughts: thoughts,
                            }).then(function () {
                                console.log("Document successfully written!");
                            })
                                .catch(function (error) {
                                    console.error("Error writing document: ", error);
                                });

                        })
                });
        }
        else{
            alert("You Have to First Login This Login")
        }
    }

    console.log(item);

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
    }
    return (
        <>
            <div className="post-parent">
                <form onSubmit={onSubmit}>
                    <div className="input-line">
                        <div className="card-user-imgs">
                            <img src={img ? img : demo} alt="img" />
                        </div>
                        <div className="input-title">
                            <div>
                                <input type="text" placeholder="Heading" name="title" onChange={onChange} value={title} required />
                            </div>
                            <div>
                                <input type="text" placeholder="Description" name="thoughts" onChange={onChange} value={thoughts} required />
                            </div>
                        </div>
                    </div>
                    <div className="display-img">
                        <img src={image ? URL.createObjectURL(image) : demo} alt="img" />
                    </div>
                    <div className="post-image">
                        <label for="upload-photos"><i class="fa fa-file-picture-o"></i></label>
                        <input id="upload-photos" type="file" accept="video/*,image/*" onChange={onImageChange} />
                        <div className="post-button">
                            <button type="submit">Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Posts;
