import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import getColour from '../utils/Colours';

export default Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => console.log('Button pressed')}
        style={styles.option}
      >
        <FontAwesome name="plus-square" size={styles.optionIcon.size} color={styles.optionIcon.color} />
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.optionTitle}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Statement')}
        style={styles.option}
      >
        <FontAwesome name="list" size={styles.optionIcon.size} color={styles.optionIcon.color} />
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.optionTitle}>Statement</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log('Button pressed')}
        style={styles.option}
      >
        <FontAwesome name="rupee" size={styles.optionIcon.size} color={styles.optionIcon.color} />
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.optionTitle}>Balance Amount</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log('Button pressed')}
        style={styles.option}
      >
        <FontAwesome name="sign-out" size={styles.optionIcon.size} color={styles.optionIcon.color} />
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.optionTitle}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.emptyBox} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: getColour('colour1')
  },
  option: {
    backgroundColor: getColour('colour5'),
    height: 120,
    width: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: getColour('colour7'),
    borderRadius: 10,
    elevation: 5
  },
  optionIcon: {
    size: 60,
    color: getColour('colour6')
  },
  optionTitle: {
    color: getColour('colour6'),
    fontSize: 18
  },
  emptyBox: {
    flexGrow: 1,
    backgroundColor: getColour('colour1')
  }
});
