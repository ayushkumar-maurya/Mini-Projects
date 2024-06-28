import db from './db';

export const getAllNotes = (setNotes) =>{
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM notes;', null,
      (txObj, resultSet) => setNotes(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
}

export const getNote = (noteId, setTitle, setNote) =>{
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM notes WHERE noteId = ?;',
      [noteId],
      (txObj, resultSet) => {
        if(resultSet.rows.length > 0) {
          setTitle(resultSet.rows._array[0].title);
          setNote(resultSet.rows._array[0].note);
        }
      },
      (txObj, error) => console.log(error)
    );
  });
}

export const addNote = (title, note) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO notes (title, note) VALUES (?, ?);',
      [title, note],
      (txObj, resultSet) => console.log('Note added successfully'),
      (txObj, error) => console.log(error)
    );
  });
}

export const updateNote = (noteId, title, note) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE notes SET title = ?, note = ? WHERE noteId = ?',
      [title, note, noteId],
      (txObj, resultSet) => {
        if(resultSet.rowsAffected > 0)
          console.log('Note updated successfully')
      },
      (txObj, error) => console.log(error)
    );
  });
}

export const deleteNote = noteId => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM notes WHERE noteId = ?',
      [noteId],
      (txObj, resultSet) => {
        if(resultSet.rowsAffected > 0)
          console.log('Note deleted successfully')
      },
      (txObj, error) => console.log(error)
    );
  });
}
