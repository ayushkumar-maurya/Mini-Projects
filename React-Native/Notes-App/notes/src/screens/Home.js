import { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import NoteItem from '../components/NoteItem';
import { getAllNotes } from '../database/queries';

export default function Home({ navigation }) {
  const [notes, setNotes] = useState([]);
  getAllNotes(setNotes);

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({item}) => <NoteItem title={item.title} note={item.note}
          goToEditNote={()=> navigation.navigate('Note', {noteId: item.noteId})} />}
        keyExtractor={item => item.noteId}
        style={styles.notesContainer}
        contentContainerStyle={styles.notes}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Note', {noteId: null})}
        style={styles.newNote}>
        <View style={styles.newNoteBackground} />
        <Entypo name="squared-plus" size={60} color="#4f46e5" backgroundColor="transparent" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  notesContainer: {
    backgroundColor: '#fff'
  },
  notes: {
    paddingTop: 10
  },
  newNote: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 30
  },
  newNoteBackground: {
    position: 'absolute',
    top: 10,
    left: 10,
    height: 40,
    width: 40,
    backgroundColor: '#f7f7f7'
  }
});
