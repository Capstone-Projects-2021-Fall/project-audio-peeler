import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2a353a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 52,
        backgroundColor: '#92cfe0',
        color: 'white',
        margin: 20,
        borderRadius: 10,
    },
    buttonRecord: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 52,
        backgroundColor: '#e03951',
        color: 'white',
        margin: 20,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    titleH1:{
        fontSize: 50,
        color: 'white',
    },
    titleH2:{
        fontSize: 30,
        color: 'white',
    }

});

/**
 * #browse-button {
  width: 200px;
  height: 52px;
  box-shadow: 0px 5px 4px black;
  border-radius: 10px;
}

 #browse-button:hover {
  box-shadow: 0px 7px 7px black;
  cursor: pointer;
}

 #browse-button::file-selector-button{
  background-color: var(--background-color-1);
  width: 200px;
  height: 52px;
  color: white;
  border-style: hidden;
  padding: 0px var(--text-spacing);
  font-size: 28px;
}
 */