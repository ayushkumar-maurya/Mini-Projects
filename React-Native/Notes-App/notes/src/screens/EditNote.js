import { useEffect, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { MaterialIcons } from '@expo/vector-icons';
import { getNote, addNote, updateNote, deleteNote } from '../database/queries';

export default function EditNote({route, navigation}) {
  const { noteId } = route.params;
  const [title, setTitle] = useState(null);
  const [note, setNote] = useState(null);

  const onSaveBtnClick = (title, note) => {
    navigation.goBack();
    if(noteId)
      updateNote(noteId, title, note)
    else
      addNote(title, note);
  }

  const onDeleteBtnClick = noteId => {
    navigation.goBack();
    deleteNote(noteId);
  }

  useEffect(() => {
    if(noteId)
      getNote(noteId, setTitle, setNote);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={() => onSaveBtnClick(title, note)}>
            <MaterialIcons name="save" size={30} color="#fff" style={styles.headerRightOpt} />
          </TouchableOpacity>
          {noteId &&
            <TouchableOpacity onPress={() => onDeleteBtnClick(noteId)}>
              <MaterialIcons name="delete" size={30} color="#fff" style={styles.headerRightOpt} />
            </TouchableOpacity>
          }
        </View>
      )
    });
  }, [title, note]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={Platform.OS === 'ios'
          ? useHeaderHeight() + 40
          : Dimensions.get('screen').height - Dimensions.get('window').height + StatusBar.currentHeight
        }
        style={styles.container}
      >
        <TextInput
          style={[styles.input, styles.title]}
          onChangeText={setTitle}
          value={title}
          placeholder="Title"
        />
        <TextInput
          style={[styles.input, styles.note]}
          onChangeText={setNote}
          value={note}
          placeholder="Note"
          multiline={true}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row'
  },
  headerRightOpt: {
    marginLeft: 2
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  input: {
    padding: 7
  },
  title: {
    borderBottomWidth: 1,
    borderColor: '#d5d5d5',
    fontSize: 20,
    fontWeight: '500'
  },
  note: {
    flexGrow: 1,
    fontSize: 15,
    textAlignVertical: 'top'
  }
});
