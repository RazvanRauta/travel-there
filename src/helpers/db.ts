import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('places.db')

export const init = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => resolve(),
        //@ts-ignore
        (_, err) => reject(err)
      )
    })
  })
}
