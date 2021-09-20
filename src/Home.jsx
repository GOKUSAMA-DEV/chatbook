import React, { useEffect, useState, useContext } from 'react'
import Context from './Context';
import { db } from "./fire";
import demo from './demo.png'
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const Profile = () => {


    const value = useContext(Context)

    const [info, setInfo] = useState([]);
    const [item, setItem] = useState([]);
    let today = new Date();
    // const [dels, setDels] = useState([])

    let id = value.google;
    let img = value.gimg;

    useEffect(() => {
        if (id) {
            // db.collection("User-Data").get().then((querySnapshot) => {
            //     querySnapshot.forEach(element => {
            //         var data = element.data();
            //         setInfo(arr => [...arr, data]);
            //         // setDels(element.id);
            //     });
            // })

            db.collection("User-Links").get().then((querySnapshot) => {
                querySnapshot.forEach(element => {
                    var data = element.data();
                    setItem(arr => [...arr, data]);
                    // setDels(element.id);
                });
            })
        }
        else {
            console.log("Failed")
            // setInfo("");
        }
    }, [id])

    // const [like, setLike] = useState(0)
    // const updateLikes = () => {
    //     let val = like;
    //     if (val === 0) {
    //         setLike(like + 1)
    //     } else {
    //         setLike(like - 1)
    //     }
    // }
    const [inputField, setInputField] = useState({
        title: "",
        link: "",
    })

    const { title, link } = inputField;

    const onChange = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (id) {

            if (!title || !link) {
                alert("dont't be blank");
            }
            else {
                setInputField({
                    title: "",
                    link: "",
                })
            }
            db.collection(`${id} link`).add({
                title: title,
                link: link,
                date: today,
            }).then(function () {
                console.log("Document successfully written!");
            })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
            db.collection("User-Links").add({
                title: title,
                link: link,
                date: today,
            }).then(function () {
                console.log("Document successfully written!");
            })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }

        console.log(inputField);
    }

    // console.log(item[0].link);
    return (
        <>

            <h2>You can upload your Youtube Links Here</h2>

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
                                <textarea type="text" className="desc" placeholder="Your Videos Link" name="link" onChange={onChange} value={link} required />
                            </div>
                        </div>
                    </div>
                    <div className="post-image">
                        <div className="post-button">
                            <button type="submit">Post</button>
                        </div>
                    </div>
                </form>
            </div>

            <h2>Welcome to your Home</h2>
            <div className="home-popo">
                {/* <div className="parent-home">
                    {
                        info.map((data, ind) => {
                            return (
                                <div className="card" key={ind}>
                                    <div className="card-header">
                                        <div className="card-user-img">
                                            <img src={data.userImg} alt="img" />
                                        </div>
                                        <div className="card-user">
                                            <p>{data.userName}</p>
                                        </div>
                                    </div>

                                    <div className="card-title">
                                        <p>{data.title}</p>
                                    </div>

                                    <img src={data.imgUrl} alt="img" />
                                    <div className="card-description">
                                        <p>{data.thoughts}</p>
                                    </div>
                                    <div>
                                        <button onClick={updateLikes}>Go
                                        </button>
                                        <p>{like}</p>
                                    </div>

                                    
                                </div>
                            )
                        })
                    }
                </div> */}

                <div>
                    {
                        item.map((val, ind) => {
                            return (
                                <div key={ind}>
                                    <iframe width="420" height="345" src={val.link}>
                                    </iframe>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default Profile
