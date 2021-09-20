import React, { useState, useContext } from 'react'
import { storage, db } from "./fire";
import Context from './Context';
import demo from './demo.png'
import "./App.css"

const Posts = () => {

    const value = useContext(Context)
    let img = value.gimg;
    let name = value.gname;
    let today = new Date();
    // const timestamp = firebase.firestore.FieldValue.serverTimestamp;

    const [image, setImage] = useState([]);
    const [inputField, setInputField] = useState({
        title: "",
        thoughts: "",
    })

    const [item, setItem] = useState([]);

    const { title, thoughts } = inputField;
    const onChange = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value })
    }


    // const [Url, setUrl] = useState([])
    const [progress, setProgress] = useState(0);

    const onSubmit = (e) => {
        let id = value.google;
        console.log(id)

        e.preventDefault();

        if (id) {

            if (!title || !thoughts || !image) {
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
            storage.ref(`/images/${store.name}`).put(store)
                .on("state_changed", alert("success"), alert, (snapshot) => {
                    // file upload progress report
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress({ progress });
                },
                    (error) => {
                        // file upload failed
                        console.log(error);
                    }, () => {

                        // Getting Download Link
                        storage.ref("images").child(store.name).getDownloadURL()
                            .then((url) => {
                                // setUrl((prevState) => [...prevState, Url])
                                console.log("My Url Is " + url);
                                db.collection(id).add({
                                    name: store.name,
                                    imgUrl: url,
                                    title: title,
                                    userImg: img,
                                    userName: name,
                                    thoughts: thoughts,
                                    date: today,
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
                                    date: today,
                                }).then(function () {
                                    console.log("Document successfully written!");
                                })
                                    .catch(function (error) {
                                        console.error("Error writing document: ", error);
                                    });

                            })
                    });
        }
        else {
            alert("You Have to First Login")
        }
    }

    console.log(item);
    console.log(progress);

    const [store, setStore] = useState([])

    const onImageChange = (e) => {
        // setImage(e.target.files[0]);

        const tempArr = [];

        [...e.target.files].forEach(file => {
            console.log("file >>> ", file);
            setStore(file);
            tempArr.push({
                data: file,
                url: URL.createObjectURL(file)
            });
        });
        setImage(tempArr);
    }

    // console.log(store.name);

    function deleteFile(e) {
        const s = image.filter((item, index) => index !== e);
        setImage(s);
        console.log(s);
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
                                <textarea type="text" className="desc" placeholder="Description" name="thoughts" onChange={onChange} value={thoughts} required />
                            </div>
                        </div>
                    </div>
                    <div className="display-img">
                        {/* <img src={image ? URL.createObjectURL(image) : demo} alt="img" /> */}
                        {
                            image.map((pic, key) => (
                                <div key={key}>
                                    <button className="delete_button" onClick={() => deleteFile(key)}>
                                        <i className="fa fa-close"></i>
                                    </button>
                                    <img src={pic.url} alt="..." />
                                </div>
                            ))
                        }
                    </div>
                    <div className="post-image">
                        <label for="upload-photos"><i className="fa fa-file-picture-o"></i></label>
                        <input id="upload-photos" type="file" accept="video/*,image/*" onChange={onImageChange} multiple />
                        <div className="post-button">
                            <button type="submit">Post</button>
                        </div>
                    </div>
                </form>
                {/* <iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe> */}
            </div>
        </>
    )
}

export default Posts;
