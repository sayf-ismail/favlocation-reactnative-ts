import { requestPermissionsAsync } from "expo-location";
import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("places.db");

export function init() {
  return new Promise((resolve, reject) => {
    database.transaction(
      function (tx) {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`);
      },
      function () {
        resolve(true);
        console.log("Created database OK");
      }
      // function (error) {
      //   reject(error.message);
      // }
    );
  });
}

export function insertPlace(place: Place) {
  const promise = new Promise((resolve, reject) => {
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
          resolve(result);
        },
        (_, error) => {
          reject(error);
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
          console.log("success fetching from database.tsx");
          console.log("result: ", result);
          resolve(result.rows._array);
        },
        (_, error) => {
          console.log("error fetching from database.tsx");
          console.log("error: ", error);
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id: number) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places WHERE id = ?",
        [id],
        (_, result) => {
          console.log(result);
          resolve(result.rows._array[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
