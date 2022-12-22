import './App.css';
// import './components/SignIn' ;
// import SignIn from './components/SignIn';
import "bootstrap/dist/css/bootstrap.min.css"
import Tooltip from "bootstrap/dist/css/bootstrap.min.css"
// import "./App.css"
import Navigation from './components/Navbar';
import "./components/Main.css"

import React, { Component } from 'react';

import Home from './components/Home';
import About from './components/About';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from './components/TODO/Settings';
import Admin from './components/Admin';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Browse from './components/Browse';
import SignOut from './components/SignOut';
import Library from './components/Library';
import Game from './components/Game'
import Top from './components/Top';
import Reviews from './components/Reviews';
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            
            <Route path="comments" element={<Reviews />} />
            <Route path="contact" element={<About />} />

            <Route path="signin" element={<SignIn />} />
            <Route path="signout" element={<SignOut />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="browse" element={<Browse />} />

            <Route path="library" element={<Library />} />

            <Route path="admin" element={<Admin />} />
            <Route path="settings" element={<Settings />} />
            <Route path="top" element={<Top />} />
            <Route path="game/:id" element={<Game />} />

            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>


    );
  }
}
export default App;
