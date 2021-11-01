# Audio Peeler Capstone Project

## Version 0.5.0 - Unfinished Business

***Distributables***

[WebApp](audiopeeler.herokuapp.com/)
&nbsp;

[Android](https://drive.google.com/file/d/1XA8k1jZYRMbehNDal20HaAYDqZWxNjLN/view?usp=sharing)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Audio Peeler is a web application that allows the user to upload or search a song and then download the component parts of the song. These parts are usually instruments but will vary based on the media file presented. Audio Peeler is written with a Python-based backend that uses the Demucs API to handle the audio file separations. The JavaScript frontend will handle the user interactions and give the user a clean interface to use the application. Due to the application being written in JavaScript, the applicaiton should be mobile friendly. The frontend will also be styled using CSS as well as handle user input using HTML elements. 

How to run Audio Peeler Mobile App:
1. clone or download this project
2. use command line and do npm install
3. input npm start in command line
4. scan the QR code in the browser
5. Run the Expo Go App in your phone

### Team Members:
- Iam Higgins
- Maguire Qvale
- Yang Bo
- Michael D'Arcy
- Franklin Lantigua
- Joshua Vazquez

### Features
- Singular Upload File Separation feature is at 100% feature completion, reworked with css, working download button, and spinner/text feedback to the user.
- Sample page is at 100% feature completion, styled with new css, has 4 sample songs, can pause/play and download the individual tracks.
- Mashup is at 30% feature completion, it is completely laid out so it can be shown in the presentation but the functionality is divided.
- YouTube Link Feature is at 40% feature completion, currently works on the staging environment of audio peeler.

### Known Bugs
- When selecting a song on the Sampler page and you switch pages the audio track keeps playing. Upon returning back to said page, you can't pause the track currently playing and trying to do so plays it twice overlapping each other.
- Resizing the page doesn't allow the user to scroll up and down the page. This means that using the webapp on mobile isn't ideal.
- Sampler page simply doesn't function on Firefox upon playing a song.
- Mobile app can only replay recorded audio file once.

## Coming Soon

### High Priority Items
- Bringing the Mashup feature to 100% completion.
- Bringing the mobile application to feature parity with the web app (Includes Singular Upload File Separation and Sampler).
- Making demucs processing more efficient.

### Medium Priority Items
- URL audio seperation integration
- Minor bug fixing (Scrollbar and sampler playback bug)
- Contributing to the demucs repository


