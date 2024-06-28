import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('notes.db');
db.transaction(tx => {
  tx.executeSql('CREATE TABLE IF NOT EXISTS notes ('
    + 'noteId INTEGER PRIMARY KEY AUTOINCREMENT, '
    + 'title TEXT, '
    + 'note TEXT'
    + ');'
  );
});

export default db;
