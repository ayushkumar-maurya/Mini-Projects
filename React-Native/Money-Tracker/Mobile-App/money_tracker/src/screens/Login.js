import { useState } from 'react';
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
import { useHeaderHeight } from '@react-navigation/elements';
import getColour from '../utils/Colours';
import { API_URL } from '../utils/Base';

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [disableLoginBtn, setDisableLoginBtn] = useState(false);

  const sendLoginRequest = async () => {

    if(checkEnteredValues()) {
      let url = API_URL + 'verifyuser';
      let params = { 
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'email': email, 'password': password })
      };

      setDisableLoginBtn(true);
      let response = await fetch(url, params)
      let data = await response.json()
      if(data && data.hasOwnProperty('isUserVerified') && data.isUserVerified)
        navigation.navigate('Dashboard');
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
    if(email) {
      setEmail(email.trim());
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
          onPress={() => console.log("Create Button clicked")}
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
    backgroundColor: getColour('bg'),
    paddingTop: 5,
    paddingBottom: 25
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: getColour('bg')
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
    color: getColour('font'),
    padding: 10,
    fontSize: 17,
    borderWidth: 1,
    borderColor: getColour('font'),
    borderRadius: 10,
    marginTop: 25
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: getColour('primaryBg'),
    padding: 10,
    borderRadius: 10,
    marginTop: 25
  },
  loginButtonText: {
    color: getColour('primaryFont'),
    fontSize: 17,
    fontWeight: 'bold'
  },
  createButton: {
    alignItems: 'center',
    backgroundColor: getColour('bg2'),
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 5
  },
  createButtonText: {
    color: getColour('font'),
    fontSize: 17,
    fontWeight: 'bold'
  }
});
