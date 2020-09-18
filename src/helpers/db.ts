import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('amazingPlaces.db')

export const init = () => {
  return new Promise<SQLite.SQLResultSet | SQLite.SQLError>(
    (resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, address TEXT NOT NULL, location TEXT NOT NULL);',
          [],
          () => resolve(),
          //@ts-ignore
          (_, err) => reject(err)
        )
      })
    }
  )
}

export const insertPlace = (
  title: string,
  image: string,
  address: string,
  location: string
) => {
  return new Promise<SQLite.SQLResultSet | SQLite.SQLError>(
    (resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO places (title, image, address,location) VALUES(?,?,?,?)',
          [title, image, address, location],
          (_, result) => resolve(result),
          //@ts-ignore
          (_, err) => reject(err)
        )
      })
    }
  )
}

export const fetchPlaces = () => {
  return new Promise<SQLite.SQLResultSet | SQLite.SQLError>(
    (resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM places',
          [],
          (_, result) => resolve(result),
          //@ts-ignore
          (_, err) => reject(err)
        )
      })
    }
  )
}
