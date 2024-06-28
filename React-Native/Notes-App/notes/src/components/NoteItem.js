import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function NoteItem({ title, note, goToEditNote }) {
  return (
    <TouchableOpacity style={styles.container} onPress={goToEditNote}>
      <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{title}</Text>
      <Text numberOfLines={3} ellipsizeMode='tail' style={styles.note}>{note}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 10,
    marginBottom: 7,
    marginHorizontal: 7,
    elevation: 5,
    padding: 7
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  note: {
    fontSize: 15
  }
});
