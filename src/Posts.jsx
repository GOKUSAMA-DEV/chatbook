import React, { useState, useContext } from 'react'
import { storage, db } from "./fire";
import Context from './Context';
import "./App.css"

const Posts = () => {

    const value = useContext(Context)

    const [image, setImage] = useState('');

    const upload = () => {
        let id = value.google;
        console.log(id)

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
                        }).then(function () {
                            console.log("Document successfully written!");
                        })
                            .catch(function (error) {
                                console.error("Error writing document: ", error);
                            });

                    })
            });
        // console.log("HIIIIII");

    }



    // const post = () => {

    // }
    // console.log(Url);
    console.log(value.google);

    // useEffect(() => {
    //     post();
    // }, [])
    // const imgName = "go";


    return (
        <>
            <div className="post-parent">
                <center>
                    <input className="upload-photo" type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                    <button onClick={upload}>Upload</button>
                </center>
                {/* <img src={url} alt="img" /> */}
            </div>
        </>
    )
}

export default Posts;
