import { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, ScrollView } from 'react-native';
import {Picker} from "@react-native-picker/picker"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatementRowItem from '../components/StatementRowItem';
import { encrypt, decrypt } from '../utils/Encryption';
import getColour from '../utils/Colours';
import { API_URL } from '../utils/Base';

export default Statement = () => {
  const [sourceId , setSourceId]  = useState('-1');
  const [fetchedSources, setFetchedSources] = useState([]);
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    // Fetching Sources.
    (async () => {
      let url = API_URL + 'sources';
      let response = await fetch(url)
      let { sources } = await response.json()
        setFetchedSources(sources);
    })();
	}, []);

  useEffect(() => {
    // Fetching Statement.
    if(sourceId != -1) {
      (async () => {
        let email = await AsyncStorage.getItem('UserEmail');
        let password = decrypt(await AsyncStorage.getItem('UserPassword'));

        let url = API_URL + 'statement';
        let postData = {data: encrypt(JSON.stringify({
          email: email,
          password: password,
          sourceId: sourceId
        }))}
        let params = { 
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData)
        };

        let response = await fetch(url, params)
        let responseData = await response.json()
        if(responseData && responseData.data) {
          let { statement } = JSON.parse(decrypt(responseData.data));
          if(statement)
            setTransactions(statement);
        }
      })();
    }
	}, [sourceId]);

  let transactionKey = 0;

  return (
    <View style={styles.container}>
      <View
        style={Platform.OS === 'ios' ? styles.dropdownContainer.ios : null}
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

      <ScrollView style={styles.statement}>

        {transactions.map(transaction => {
          return <StatementRowItem key={++transactionKey} transactionInfo={transaction} />
        })}

      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColour('colour1'),
    padding: 10
  },
  dropdownContainer: {
    ios: {
      height: 50,
      overflow: 'hidden',
      backgroundColor: getColour('colour1')
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
  statement: {
    flex: 1,
    marginTop: 10
  }
});
