import './Home.css';
import React, {useState} from 'react';
import FileUpload from "./FileUpload";
import URLUpload from "./URLUpload";
import RecordUpload from "./RecordUpload";

function Home() {
    const [isJohn, setIsJohn] = useState("file");

    function fileUrlToggle(childData) {
        setIsJohn(childData)
    }

    return (
        <div id="page">


            {/* { isJohn ? <FileUpload fileUrlToggleProp={fileUrlToggle}/> : <URLUpload fileUrlToggleProp={fileUrlToggle}/>} */}
            { isJohn === "file" ? <FileUpload fileUrlToggleProp={fileUrlToggle}/> : isJohn === "url" ? <URLUpload fileUrlToggleProp={fileUrlToggle}/> : isJohn === "record" ? <RecordUpload fileUrlToggleProp={fileUrlToggle}/> : ""}


        </div>
    )
};

export default Home;