import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './App.css';
import Home from "./home/Home";
import Mashup from './mashup/Mashup';
import Samplers from './samplers/Samplers';
import Routing from "./Routing.js"
import axios from 'axios';

export default function App() {
    return (
      <Router>
          <div id="header">
        <Link to="/mashup">
            <div className="nav-button" id="mashup-button">Mashup</div>
        </Link>
        <Link to="/samplers">
            <div className="nav-button" id="samplers-button">Samplers</div>
        </Link>
        <Link to="/">
            <div className="nav-button" id="home-button">Home</div>
        </Link>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/mashup">
              <Mashup />
            </Route>
            <Route path="/samplers">
              <Samplers />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          </div>
      </Router>
    );
  }
