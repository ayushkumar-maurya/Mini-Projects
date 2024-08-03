import { Text, View, StyleSheet } from 'react-native';
import getColour from '../utils/Colours';

export default StatementRowItem = props => {
  const {description, datetime, source, amount} = props.transactionInfo

  return (
    <View style={styles.container}>

      <View style={styles.descContainer}>
        <Text style={styles.desc}>{description}</Text>
        <Text style={styles.info}>{datetime}</Text>
        <Text style={styles.info}>{source}</Text>
      </View>

      <View style={styles.amtContainer}>
        <Text
          style={[styles.amt, amount >= 0 ? styles.credit : styles.debit]}
        >
          {amount}
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
  descContainer: {
    flex: 3
  },
  desc: {
    textAlign: 'justify',
    fontSize: 15,
    marginBottom: 2
  },
  info: {
    fontSize: 12
  },
  amtContainer: {
    flex: 1
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
