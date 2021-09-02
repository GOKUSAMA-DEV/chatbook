import React, { useEffect, useState, useContext } from 'react'
import Context from './Context';

import { db } from "./fire";

const Home = () => {

    const value = useContext(Context)

    const [info, setInfo] = useState([]);
    const [dels, setDels] = useState([])

    let id = value.google;
    let name = value.gname;
    let img = value.gimg;
    // console.log(id + "gogogo")
    // console.log(name + "gogogo")

    useEffect(() => {

        if (id) {
            
            db.collection(id).get().then((querySnapshot) => {

                // Loop through the data and store
                // it in array to display
                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr, data]);
                    // console.log(element.id, data);
                    setDels(element.id)
                    // console.log([data]);
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
            <h1>THis is Home</h1>

            <div className="home-popo">
                <div className="parent-home">
                    {
                        info.map((data, ind) => {
                            return (
                                <div className="card" key={ind}>
                                    <div className="card-header">
                                        <div className="card-user-img">
                                            <img src={img} alt="img" />
                                        </div>
                                        <div className="card-user">
                                            <p>{name}</p>
                                            {/* <select>
                                                <option value="0">Select car:</option>
                                                <option value="1">Audi</option>
                                                <option value="2">BMW</option>
                                                <option value="3">Citroen</option>
                                            </select> */}
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
