import axios from "axios";
import './Home.css';
import React, {useState} from 'react';
import FileUpload from "./FileUpload";
import URLUpload from "./URLUpload";
import RecordUpload from "./RecordUpload";

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


            {/* { isJohn ? <FileUpload fileUrlToggleProp={fileUrlToggle}/> : <URLUpload fileUrlToggleProp={fileUrlToggle}/>} */}
            { isJohn ? <FileUpload fileUrlToggleProp={fileUrlToggle}/> : <RecordUpload fileUrlToggleProp={fileUrlToggle}/>}


        </div>
    )
};

export default Home;