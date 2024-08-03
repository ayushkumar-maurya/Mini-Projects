import { useState, useEffect } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHeaderHeight } from '@react-navigation/elements';
import { encrypt, decrypt } from '../utils/Encryption';
import getColour from '../utils/Colours';
import { API_URL } from '../utils/Base';

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [disableLoginBtn, setDisableLoginBtn] = useState(false);

  useEffect(() => {
    if(email && email !== email.trim())
      setEmail(email.trim());
  }, [email]);

  const sendLoginRequest = async () => {

    if(checkEnteredValues()) {
      let isUserVerified = false;
      let url = API_URL + 'verifyuser';
      let postData = {data: encrypt(JSON.stringify({
        email: email,
        password: password
      }))}
      let params = { 
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      };

      setDisableLoginBtn(true);
      let response = await fetch(url, params)
      let responseData = await response.json()
      if(responseData && responseData.data) {
        let { authStatus } = JSON.parse(decrypt(responseData.data));
        isUserVerified = authStatus;
      }

      if(isUserVerified) {
        try {
          await AsyncStorage.setItem('UserEmail', email);
          await AsyncStorage.setItem('UserPassword', encrypt(password));
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }]
          });
        } catch (err) {
          Alert.alert('Warning', 'Something went wrong.', [
            { text: 'OK' },
          ])
        }
      }
      else {
        setDisableLoginBtn(false);
        Alert.alert('Error', 'Incorrect Email or Password. Please try again.', [
          { text: 'OK' },
        ])
      }
    }

    else {
      Alert.alert('Error', 'Please fill all the Fields correctly.', [
        { text: 'OK' },
      ])
    }
  }

  const checkEnteredValues = () => {
    if(email && password) {
      if(email.length > 0 && password.length > 0)
        return true;
    }
    return false;
  }

  return (
    <KeyboardAvoidingView
      behavior={'height'}
      keyboardVerticalOffset={useHeaderHeight()}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>

        <Image
          source={require('../../assets/logo.jpg')}
          style={styles.logo}
        />

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />

        <TouchableOpacity
          onPress={sendLoginRequest}
          style={styles.loginButton}
          disabled={disableLoginBtn}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Create New User')}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>Create New User</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColour('colour1'),
    paddingTop: 5,
    paddingBottom: 25
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: getColour('colour1')
  },
  logo: {
    marginTop: 45,
    marginBottom: 25,
    height: 100,
    width: 100,
    borderRadius: 20,
    alignSelf: 'center'
  },
  input: {
    color: getColour('colour2'),
    padding: 10,
    fontSize: 17,
    borderWidth: 1,
    borderColor: getColour('colour2'),
    borderRadius: 10,
    marginTop: 25
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: getColour('colour3'),
    padding: 10,
    borderRadius: 10,
    marginTop: 25
  },
  loginButtonText: {
    color: getColour('colour4'),
    fontSize: 17,
    fontWeight: 'bold'
  },
  createButton: {
    alignItems: 'center',
    backgroundColor: getColour('colour5'),
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 5
  },
  createButtonText: {
    color: getColour('colour2'),
    fontSize: 17,
    fontWeight: 'bold'
  }
});
