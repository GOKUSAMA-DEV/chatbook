import React, { useEffect, useState, useContext } from 'react'
import Context from './Context';

import { db } from "./fire";
import Posts from './Posts';

const Home = () => {

    const value = useContext(Context)

    const [info, setInfo] = useState([]);
    const [dels, setDels] = useState([])

    let id = value.google;
    // let img = value.gimg;

    useEffect(() => {
        if (id) {
            db.collection(id).get().then((querySnapshot) => {
                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr, data]);
                    setDels(element.id);
                });
            })
        }
        else {
            console.log("Failed")
            // setInfo("");
        }
    }, [id])

    const del = () => {
        db.collection(id).doc(dels).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }


    return (
        <>
            <h2>What's in Your Mind</h2>
            <Posts />
            <h2>Your Post is Here</h2>
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

                                    <div className="card-panel">
                                        <button onClick={del}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        </>
    )
}

export default Home
