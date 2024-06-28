import { useState } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import getColour from '../utils/Colours';

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

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
          onPress={() => console.log("Login Button clicked")}
          style={styles.loginButton}
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
