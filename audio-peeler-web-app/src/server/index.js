const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs')
let AdmZip = require("adm-zip");

app.use(cors());
app.use(express.json());

/**
 * An api in which :filename is the name of the file we want to work with from the get request
 */
app.get("/zip/:filename", async(req, res) =>{
    try{
        const {filename} = req.params;

        /**
         * Checks to see if the file exists, if it does it confirms it in the console log for the
         * server.
         */
        try {
            if (fs.existsSync(`../${filename}.zip`)) {
                console.log("it exists")
            }
        } catch(err) {
            console.error(err)
        }
        console.log(filename)

        /**
         * Searches for the file and creates a new object for it.
         *
         * It then creates an array containing information on the entries. Some such data includes the compressed data.
         *
         * The json for each item in the array is the following
         *
         *       entryName: [Getter/Setter],
         *       rawEntryName: [Getter],
         *       extra: [Getter/Setter],
         *       comment: [Getter/Setter],
         *       name: [Getter],
         *       isDirectory: [Getter],
         *       getCompressedData: [Function: getCompressedData],
         *       getCompressedDataAsync: [Function: getCompressedDataAsync],
         *       setData: [Function: setData],
         *       getData: [Function: getData],
         *       getDataAsync: [Function: getDataAsync],
         *       attr: [Getter/Setter],
         *       header: [Getter/Setter],
         *       packHeader: [Function: packHeader],
         *       toJSON: [Function: toJSON],
         *       toString: [Function: toString]
         *
         */
        let zip = new AdmZip(`../${filename}.zip`);
        let zipEntries = zip.getEntries();

        /**
         * Finally it returns the array of json objects
         */
        res.json(zipEntries)
    }catch (e) {
        console.log(e)
    }


})

app.listen(5001, () =>{
    console.log("server has started on port 5000");
} );