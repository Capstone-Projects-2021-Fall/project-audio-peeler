import React from 'react';
import {HashRouter, Switch, Route, Link} from "react-router-dom";
import Mashup from "./mashup/Mashup";
import Home from "./home/Home";
import './App.css';


function Routing(props) {


    return (

    <HashRouter>
        <div className="App">
            <Link to="/">
                <button type="button" className={"button"}>
                    Home
                </button>
            </Link>

            <Link to="/Mashup">
                <button type="button" className={"button"}>
                    Mashup
                </button>
            </Link>

            <Switch>
                <Route path="/Mashup">
                    <Mashup/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </div>
    </HashRouter>
    );
}

export default Routing