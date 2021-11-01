import { StatusBar } from 'expo-status-bar';
// import * as React from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import Home from "./components/home/Home";
import styles from './App.component';


export default function App() {
  return (
    <View style={styles.container}>
      <Home/>
    </View>
  );
}

