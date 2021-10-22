import React from 'react';
import './App.css';
import {HashRouter, Switch, Route, Link} from "react-router-dom";
import Home from "./home/Home";
import Samplers from "./samplers/Samplers";
import Mashup from "./mashup/Mashup";

function Routing(props) {
    return (
    <HashRouter>
            <div id="header">
                <button type="button" id="mobile-app-button" className="nav-button">
                    Try the App!
                </button>
            <Link to="/Mashup">
                <button type="button" id="mashup-button" className="nav-button">
                    Mashup
                </button>
            </Link>
            <Link to="/Samplers">
                <button type="button" id="samplers-button" className="nav-button">
                    Samplers
                </button>
            </Link>
            <Link to="/">
                <button type="button" id="home-button" className="nav-button">
                    Audio Peeler
                </button>
            </Link>
            </div>
            <Switch>
                <Route path="/">
                    <Home/>
                </Route>
                <Route path="/Samplers">
                    <Samplers/>
                </Route>
                <Route path="/Mashup">
                    <Mashup/>
                </Route>
            </Switch>
    </HashRouter>
    );
}

export default Routing