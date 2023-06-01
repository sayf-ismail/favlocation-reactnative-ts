import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise: Promise<void> = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        (_, result) => {
          console.log("Database table created or already exists");
          resolve();
        },
        (_, err) => {
          console.error("Error creating database table:", err);
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place: Place) {
  const promise: Promise<void> = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          console.log("Place inserted into the database:", result);
          resolve();
        },
        (_, err) => {
          console.error("Error inserting place into the database:", err);
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise: Promise<Place[]> = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];

          for (const dp of result.rows._array) {
            places.push({
              id: dp.id.toString(),
              title: dp.title,
              imageUri: dp.imageUri,
              address: dp.address,
              location: {
                lat: dp.lat,
                lng: dp.lng,
              },
            });
          }

          console.log("Places fetched from the database:", places);
          resolve(places);
        },
        (_, err) => {
          console.error("Error fetching places from the database:", err);
          reject(err);
          return true;
        }
      );
    });
  });

  return promise;
}
