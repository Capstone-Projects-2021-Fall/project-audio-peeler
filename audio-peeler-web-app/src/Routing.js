import React from 'react';
import './App.css';
import {HashRouter, Switch, Route, Link} from "react-router-dom";
import Mashup from "./mashup/Mashup";
import Home from "./home/Home";



function Routing(props) {


    return (

    <HashRouter>
        <div className="App">

            <div className={"divvy"}>
            <Link to="/">
                <button type="button" className={"navbutton"}>
                    Home
                </button>
            </Link>


            <Link to="/Mashup">
                <button type="button" className={"navbutton"}>
                    Mashup
                </button>
            </Link>

            </div>

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