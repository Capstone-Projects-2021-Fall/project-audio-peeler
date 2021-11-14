import axios from "axios";
import './Home.css';
import React, {useState} from 'react';
import FileUpload from "./FileUpload";
import URLUpload from "./URLUpload";

function Home() {
    const [isJohn, setIsJohn] = useState(true);

    function togglable () {
        setIsJohn(!isJohn);
    }

    function fileUrlToggle(childData) {
        setIsJohn(childData)
    }

    return (
        <div id="page">


            { isJohn ? <FileUpload fileUrlToggleProp={fileUrlToggle}/> : <URLUpload fileUrlToggleProp={fileUrlToggle}/>}

        </div>
    )
};

export default Home;