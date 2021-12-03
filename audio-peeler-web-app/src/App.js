import React, {useMemo} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import './home/Home.css';
import './mashup/Mashup.css';
import './samplers/Samplers.css';
import Home from "./home/Home";
import Mashup from './mashup/Mashup';
import Samplers from './samplers/Samplers';
import FileUrlContext from "./FileUrlContext";

export default function App() {
    const [john, setJohn] = React.useState(false);
    const value = useMemo(() => ({john, setJohn}), [john]);

    return (
        <Router>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>            <div id="header">
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
                <FileUrlContext.Provider value={value}>
                <Switch>
                    <Route path="/mashup">
                        <Mashup/>
                    </Route>
                    <Route path="/samplers">
                        <Samplers/>
                    </Route>
                    <Route path="/">
                            <Home/>
                    </Route>
                </Switch>
            </FileUrlContext.Provider>
            </div>
        </Router>

    );
}
