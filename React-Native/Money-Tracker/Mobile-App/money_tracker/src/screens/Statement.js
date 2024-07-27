import { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView } from 'react-native';
import {Picker} from "@react-native-picker/picker"; 
import StatementRowItem from '../components/StatementRowItem';
import getColour from '../utils/Colours';

export default Statement = () => {
  const [source , setSource]  = useState('Select Source');
  
  return (
    <View style={styles.container}>
      <View
        style={Platform.OS === 'ios' ? styles.dropdownContainer.ios : null}
      >
        <Picker
          selectedValue={source}
          mode="dropdown"
          onValueChange={itemValue => setSource(itemValue)}
          style={Platform.OS === 'ios' ? styles.dropdown.ios : styles.dropdown.android}
        >

          <Picker.Item label='Select Source' value='-1' />
          <Picker.Item label='Abc' value='0' />
          <Picker.Item label='Pqrs' value='1' />
          <Picker.Item label='Xyz' value='2' />

        </Picker>
      </View>

      <ScrollView style={styles.statement}>

        <StatementRowItem transactionInfo={{
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          date: '04 May 2024 14:23',
          source: 'Abcde',
          amount: 4587.47
          }} />

        <StatementRowItem transactionInfo={{
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          date: '12 Aug 2024 18:23',
          source: 'Pqrstuv',
          amount: -889.00
          }} />

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
