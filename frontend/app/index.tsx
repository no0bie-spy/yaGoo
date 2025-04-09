import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const App = () => {
  const [text, setText] = useState('Hello, React Native!');

  const changeText = () => {
    setText('You pressed the button!');
  };
  const updateText=()=>{
    setText("")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Button title="Press me" onPress={changeText} />
      <Button title='Press to change' onPress={updateText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default App;
