import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import firebaseConfig from './firebaseConfig';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login authentication logic here
    // For simplicity, we'll navigate to the "Home" page on successful login

    // Store the data in Firebase Firestore
    firebase
      .firestore()
      .collection('users')
      .add({
        username,
        password,
      })
      .then(() => {
        // Show alert on successful record creation
        Alert.alert('Record Created', 'Data has been stored in Firebase Firestore.');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', 'An error occurred while storing the data.');
      });

    navigation.navigate('Home');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login Page</Text>
      <Text style={styles.label}>Enter your name</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={styles.label}>Enter your password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonLeft}>
          <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={styles.buttonRight}>
          <Button title="SignUp" onPress={handleSignUp} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    paddingLeft: 20,
    alignSelf: 'flex-start',
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  buttonLeft: {
    flex: 1,
    marginRight: 30,
  },
  buttonRight: {
    flex: 1,
    marginLeft: 30,
  },
});

export default LoginPage;

