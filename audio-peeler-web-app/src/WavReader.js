import JSZip, { files } from 'jszip';

var FILES = ["bass.wav", "drums.wav", "vocals.wav", "other.wav"];
var c_increment = 0;

async function WavReader(response) {

    async function createFile(s){
        var res = await fetch(s);
        var data = await res.blob();
        var metadata = {
            type: 'application/zip'
        };
        var file = new File([data], "temp.zip", metadata);
        return file;
    }

    var audios = [];
    var file = createFile(response.data);
        var new_zip = new JSZip();
            new_zip.loadAsync(file)
            .then(function(zip) {
                for (var i = 0; i < FILES.length; i++) {
                    // doesn't seem to be properly appending the new Audio file
                    // FILES[c_increment returns strings representing the names of the files that are to be used in the 
                    // zip.file function
                    // might be because it's async
                    // figure out where to put 'await' keyword 
                    // look up await keyword/async functions
                    zip.file(FILES[c_increment++]).async("base64").then(function(banana) {
                        audios.push(new Audio("data:audio/wav;base64," + banana));
                    });
                }
            });

    return audios;
};

export default WavReader;