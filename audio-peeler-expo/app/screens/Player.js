import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';

const Player = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to</Text>
      <Text style={{fontSize:18}}>Audio Peeler</Text>
      <Button
          title="Start Recording"
            // title={isRecording ? 'Stop Recording' : 'Start Recording'}
            // onPress={isRecording ? () => stopRecording() : () => startRecording()}
          />
          <Button
            title="Play Sound"
            // onPress={isPLaying ? () => stopSound : () => playSound()}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Player;
