import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("places.db");

export function init() {
  console.log("Initializing database...");
  const promise: Promise<void> = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        text TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`,
        [],
        () => {
          console.log("Database table created or already exists");
          resolve();
        },
        (_, err) => {
          console.error("Error creating database table:", err);
          reject(err);
        }
      );
    });
  });
  return promise;
}

export async function insertPlace(place: Place): Promise<Place> {
  console.log("Inserting place:", place);

  try {
    await init();
    // await executeInsertion(place);
    // const retrievedPlace = await executeRetrieval(place.id);
    // console.log("Inserted place:", retrievedPlace);
    // return retrievedPlace;
  } catch (error) {
    console.log("init error:", error);
    throw error;
  }
}

// const executeSql = (
//   sql: string,
//   params: any[] = []
// ): Promise<SQLite.SQLResultSet> => {
//   return new Promise<SQLite.SQLResultSet>((resolve, reject) => {
//     database.transaction((tx: SQLite.SQLTransaction) => {
//       tx.executeSql(
//         sql,
//         params,
//         (_, result) => resolve(result),
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

// const executeInsertion = async (place: Place): Promise<boolean> => {
//   const sql =
//     "INSERT INTO places (id, title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?, ?)";
//   const params = [
//     place.id,
//     place.title,
//     place.imageUri,
//     place.address,
//     place.location.lat,
//     place.location.lng,
//   ];

//   try {
//     await executeSql(sql, params);
//     console.log("Place inserted successfully");
//     return true;
//   } catch (error) {
//     console.log("Failed to insert place:", error);
//     throw error;
//   }
// };

// const executeRetrieval = async (id: string) => {
//   const sql = "SELECT * FROM places WHERE id = ?";
//   const params = [id];

//   try {
//     const result = await executeSql(sql, params);
//     const { rows } = result;

//     if (rows.length > 0) {
//       const place = rows.item(0);
//       console.log("Retrieved Place:", place);
//       return place;
//     } else {
//       console.log("Place not found");
//       return null;
//     }
//   } catch (error) {
//     console.log("Failed to retrieve place:", error);
//     throw error;
//   }
// };

// export function fetchPlaces(): Promise<Place[]> {
//   const promise: Promise<Place[]> = new Promise((resolve, reject) => {
//     database.transaction((tx: SQLite.SQLTransaction) => {
//       tx.executeSql(
//         `SELECT * FROM places`,
//         [],
//         (_, result) => {
//           const places: Place[] = [];

//           for (let i = 0; i < result.rows.length; i++) {
//             const row = result.rows.item(i);
//             const place: Place = {
//               id: row.id.toString(),
//               title: row.title,
//               imageUri: row.imageUri,
//               address: row.address,
//               location: {
//                 lat: row.lat,
//                 lng: row.lng,
//               },
//             };
//             places.push(place);
//           }

//           resolve(places);
//         },
//         (_, error) => {
//           reject(error);
//           return true;
//         }
//       );
//     });
//   });

//   return promise;
// }
