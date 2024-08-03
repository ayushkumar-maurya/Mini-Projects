import { useState, useEffect } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  View,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from "@react-native-picker/picker"; 
import { useHeaderHeight } from '@react-navigation/elements';
import { encrypt, decrypt } from '../utils/Encryption';
import getColour from '../utils/Colours';
import { API_URL } from '../utils/Base';

export default function AddTransaction() {
  const [fetchedSources, setFetchedSources] = useState([]);
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);
  const [sourceId, setSourceId] = useState(null);
  const [disableAddBtn, setDisableAddBtn] = useState(false);

  useEffect(() => {
    // Fetching Sources.
    (async () => {
      let url = API_URL + 'sources';
      let response = await fetch(url)
      let { sources } = await response.json()
        setFetchedSources(sources);
    })();
	}, []);

  const sendAddRequest = async () => {
    let alertMsg;

    if(checkEnteredValues()) {
      let additionStatus = 'no';
      let email = await AsyncStorage.getItem('UserEmail');
      let password = decrypt(await AsyncStorage.getItem('UserPassword'));

      let url = API_URL + 'addTransaction';
      let postData = {data: encrypt(JSON.stringify({
        email: email,
        password: password,
        sourceId: sourceId,
        description: description,
        amount: amount
      }))}
      let params = { 
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      };

      setDisableAddBtn(true);
      let response = await fetch(url, params)
      let responseData = await response.json()
      if(responseData && responseData.data) {
        let { transactionAdded } = JSON.parse(decrypt(responseData.data));
        additionStatus = transactionAdded;
      }

      setDisableAddBtn(false);
      alertMsg = additionStatus ? 'Transaction added Successfully!' : 'Unable to add Transaction';
    }

    else
      alertMsg = 'Please fill all the Fields correctly.'

    Alert.alert('Warning', alertMsg, [
      { text: 'OK' },
    ]);
  }

  const checkEnteredValues = () => (amount && sourceId && sourceId != -1);

  return (
    <KeyboardAvoidingView
      behavior={'height'}
      keyboardVerticalOffset={useHeaderHeight()}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>

        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder="Description"
        />

        <TextInput
          style={styles.input}
          keyboardType='numeric'
          onChangeText={setAmount}
          value={amount}
          placeholder="Amount"
        />

        <View
          style={Platform.OS === 'ios' ? styles.dropdownContainer.ios : styles.dropdownContainer.android}
        >
          <Picker
            selectedValue={sourceId}
            mode="dropdown"
            onValueChange={itemValue => setSourceId(itemValue)}
            style={Platform.OS === 'ios' ? styles.dropdown.ios : styles.dropdown.android}
          >

            <Picker.Item label='Select Source' value='-1' />
            {fetchedSources.map(source => {
              return <Picker.Item key={source.id} label={source.name} value={source.id} />
            })}

          </Picker>
        </View>

        <TouchableOpacity
          onPress={sendAddRequest}
          style={styles.addButton}
          disabled={disableAddBtn}
        >
          <Text style={styles.addButtonText}>Add</Text>
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
  input: {
    color: getColour('colour2'),
    padding: 10,
    fontSize: 17,
    borderWidth: 1,
    borderColor: getColour('colour2'),
    borderRadius: 10,
    marginTop: 25
  },
  dropdownContainer: {
    ios: {
      height: 50,
      overflow: 'hidden',
      backgroundColor: getColour('colour1'),
      marginTop: 25
    },
    android: {
      marginTop: 25
    }
  },
  dropdown: {
    ios: {
      marginTop: -85
    },
    android: {
      backgroundColor: getColour('colour5'),
      elevation: 5
    }
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: getColour('colour3'),
    padding: 10,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 5
  },
  addButtonText: {
    color: getColour('colour4'),
    fontSize: 17,
    fontWeight: 'bold'
  }
});
