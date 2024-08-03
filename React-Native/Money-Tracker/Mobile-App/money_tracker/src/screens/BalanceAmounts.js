import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BalanceAmountRowItem from '../components/BalanceAmountRowItem';
import { encrypt, decrypt } from '../utils/Encryption';
import getColour from '../utils/Colours';
import { API_URL } from '../utils/Base';

export default BalanceAmounts = () => {
  const [amounts, setAmounts] = useState([]);

  useEffect(() => {
    // Fetching Balance Amounts.
    (async () => {
      let email = await AsyncStorage.getItem('UserEmail');
      let password = decrypt(await AsyncStorage.getItem('UserPassword'));

      let url = API_URL + 'balanceamounts';
      let postData = {data: encrypt(JSON.stringify({
        email: email,
        password: password
      }))}
      let params = { 
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      };

      let response = await fetch(url, params)
      let responseData = await response.json()
      if(responseData && responseData.data) {
        let { balanceAmounts } = JSON.parse(decrypt(responseData.data));
        if(balanceAmounts && balanceAmounts.length > 0)
          setAmounts(balanceAmounts);
      }
    })();
	}, []);

  let amountKey = 0;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.amounts}>

        {amounts.map(amount => {
          return <BalanceAmountRowItem key={++amountKey} balanceAmount={amount} />
        })}

      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getColour('colour1'),
    padding: 5
  },
  amounts: {
    flex: 1,
    marginBottom: 17
  }
});
