/**
 *  var wr = WavReader(response);
    wr.then((result) =>  {
        result.forEach((a, index) => {
            // uncomment line below to play
            // a.play();
        })
    });
*/

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

    var audios = [new Audio(), new Audio(), new Audio(), new Audio()];
    var audioBlobs = [];
    
    var file = createFile(response.data);
    var jsZip = require('jszip')
    jsZip.loadAsync(file).then(function (zip) {
        Object.keys(zip.files).forEach((filename, index) => {
            zip.files[filename].async('base64').then(function (banana) {
                audios[index].src = 'data:audio/wav;base64,' + banana;
            });
        })
    });
    return {'audios': audios, 'blobs': audioBlobs};
};

export default WavReader;