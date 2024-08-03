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

export default function CreateNewUser({ navigation }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);
  const [password, setPassword] = useState(null);
  const [disableCreateBtn, setDisableCreateBtn] = useState(false);

  useEffect(() => {
    if(email && email !== email.trim())
      setEmail(email.trim());
  }, [email]);

  const sendCreateRequest = async () => {

    if(checkEnteredValues()) {
      let creationStatus = 'no';
      let url = API_URL + 'adduser';
      let postData = {data: encrypt(JSON.stringify({
        email: email,
        password: password,
        name: name,
        mobileNo: mobileNo
      }))}
      let params = { 
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      };

      setDisableCreateBtn(true);
      let response = await fetch(url, params)
      let responseData = await response.json()
      if(responseData && responseData.data) {
        let { createStatus } = JSON.parse(decrypt(responseData.data));
        creationStatus = createStatus;
      }

      if(creationStatus === 'yes') {
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
        setDisableCreateBtn(false);
        let alertMsg = 'Unable to Create, please try aagain.'
        if(creationStatus === 'exists')
          alertMsg = 'User with the mentioned email / mobile no. already exists.';
        Alert.alert('Error', alertMsg, [
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
    if(name && email && mobileNo && password) {
      if(name.length > 0 &&
         email.length > 0 &&
         mobileNo.length > 0 &&
         password.length > 0)

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
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />

        <TextInput
          style={styles.input}
          keyboardType='numeric'
          onChangeText={setMobileNo}
          value={mobileNo}
          placeholder="Mobile No"
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />

        <TouchableOpacity
          onPress={sendCreateRequest}
          style={styles.createButton}
          disabled={disableCreateBtn}
        >
          <Text style={styles.createButtonText}>Create</Text>
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
  createButton: {
    alignItems: 'center',
    backgroundColor: getColour('colour3'),
    padding: 10,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 5
  },
  createButtonText: {
    color: getColour('colour4'),
    fontSize: 17,
    fontWeight: 'bold'
  }
});
