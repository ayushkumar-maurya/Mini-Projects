import { Text, View, StyleSheet } from 'react-native';
import getColour from '../utils/Colours';

export default BalanceAmountRowItem = props => {
  const {name, total_amount} = props.balanceAmount

  return (
    <View style={styles.container}>

      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.amtContainer}>
        <Text
          style={[styles.amt, total_amount >= 0 ? styles.credit : styles.debit]}
        >
          {total_amount}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: getColour('colour5'),
    borderWidth: 1,
    borderColor: getColour('colour7'),
    borderRadius: 10,
    elevation: 5,
    padding: 5,
    marginBottom: 7
  },
  nameContainer: {
    flex: 3
  },
  name: {
    textAlign: 'justify',
    fontSize: 15
  },
  amtContainer: {
    flex: 2
  },
  amt: {
    textAlign: 'right',
    fontSize: 15,
    fontWeight: '500'
  },
  credit: {
    color: getColour('colour8')
  },
  debit: {
    color: getColour('colour9')
  }
});
