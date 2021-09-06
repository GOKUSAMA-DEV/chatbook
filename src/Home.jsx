import React, { useEffect, useState, useContext } from 'react'
import Context from './Context';
import { db } from "./fire";

const Profile = () => {


    const value = useContext(Context)

    const [info, setInfo] = useState([]);
    // const [dels, setDels] = useState([])

    let id = value.google;
    // let img = value.gimg;

    useEffect(() => {
        if (id) {
            db.collection("User-Data").get().then((querySnapshot) => {
                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr, data]);
                    // setDels(element.id);
                });
            })
        }
        else {
            console.log("Failed")
            // setInfo("");
        }
    }, [id])


    return (
        <>
            <h1>Welcome to your Home</h1>
            <div className="home-popo">
                <div className="parent-home">
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

                                    <img src={data.imgUrl} alt="img" />

                                    {/* <div className="card-panel">
                                        <button onClick={del}>Delete</button>
                                    </div> */}
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
