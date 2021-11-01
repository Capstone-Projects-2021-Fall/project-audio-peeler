import {StatusBar} from 'expo-status-bar';
// import * as React from 'react';
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Pressable} from 'react-native';
import {Audio} from 'expo-av';
import styles from './Home.component';

let recording = new Audio.Recording();

export default function Home() {
    const [RecordedURI, SetRecordedURI] = useState('');
    const [AudioPerm, SetAudioPerm] = useState(false);
    const [isRecording, SetisRecording] = useState(false);
    const [isPLaying, SetisPLaying] = useState(false);
    const Player = useRef(new Audio.Sound());

    useEffect(() => {
        GetPermission();
    }, []);

    const GetPermission = async () => {
        const getAudioPerm = await Audio.requestPermissionsAsync();
        SetAudioPerm(getAudioPerm.granted);
    };

    const startRecording = async () => {
        try {
            console.log("Requesting permissions..");
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log("Starting recording..");
            await recording.prepareToRecordAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            await recording.startAsync();
            SetisRecording(true);
        } catch (error) {
            console.log(error);
        }
    };

    const stopRecording = async () => {
        try {
            console.log("Stopping recording..");
            await recording.stopAndUnloadAsync();
            const result = recording.getURI();
            SetRecordedURI(result); // Here is the URI
            recording = new Audio.Recording();
            SetisRecording(false);
        } catch (error) {
            console.log(error);
        }
    };

    const playSound = async () => {
        try {
            const result = await Player.current.loadAsync(
                { uri: RecordedURI },
                {},
                true
            );

            const response = await Player.current.getStatusAsync();
            if (response.isLoaded) {
                if (response.isPlaying === false) {
                    await Player.current.playAsync();
                    SetisPLaying(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const stopSound = async () => {
        try {
            const checkLoading = await Player.current.getStatusAsync();
            if (checkLoading.isLoaded === true) {
                await Player.current.stopAsync();
                SetisPLaying(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <Text style={styles.titleH2}>Welcome to</Text>
            <Text style={styles.titleH1}>Audio Peeler</Text>

            <StatusBar style="auto"/>

            <Pressable style={styles.button}>
                <Text>Browse</Text>
            </Pressable>

            <Pressable
                style={styles.buttonRecord}
                onPress={isRecording ? () => stopRecording() : () => startRecording()}>
                <Text>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
            </Pressable>

            <Pressable
                style={styles.button}

                onPress={isPLaying ? () => stopSound : () => playSound()}>
                <Text>Play Sound</Text>
            </Pressable>

            <Text>{RecordedURI}</Text>
        </React.Fragment>
    );
}