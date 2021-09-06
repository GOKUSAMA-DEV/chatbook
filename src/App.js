import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Route, Switch, Link } from 'react-router-dom';
import "./App.css";
// import Header from "./Header";
import Home from "./Home";
import Posts from "./Posts";
import Profile from './Profile';
import Context from './Context';
import Blog from './Blog';
import Movies from './Movies';

// export const contextValue = createContext()

const App = () => {


  const clientId = "858912927585-10m54q22q63t3m6hv1qpd1d38fegc3lj.apps.googleusercontent.com";
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [imgs, setImgs] = useState("")
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const onLoginSuccess = (res) => {
    console.log('Login Success:', res.profileObj);
    setName(res.profileObj.name);
    setId(res.profileObj.googleId);
    setImgs(res.profileObj.imageUrl);
    // setMail(res.profileObj.email);
    setShowloginButton(false);
    setShowlogoutButton(true);
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
    setName("");
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  return (
    <>
      <div className="header">
        <div className="title">
          <h1><Link to="/">HorrorBook</Link></h1>
          <p>Welcome {name}</p>
        </div>
        <div className="nav-panel">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/"><div className="login-button">
            {showloginButton ?
              <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              /> : null}

            {showlogoutButton ?
              <GoogleLogout
                clientId={clientId}
                buttonText="LogOut"
                onLogoutSuccess={onSignoutSuccess}
              >
              </GoogleLogout> : null
            }
          </div>
          </Link>
        </div>
      </div>
      <Context.Provider value={{ google: id, gname: name, gimg: imgs }}>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/movies" component={Movies}></Route>
          <Route exact path="/profile" component={Profile}></Route>
          <Route exact path="/blog" component={Blog}></Route>
        </Switch>
      </Context.Provider>
    </>
  )
}

export default App
