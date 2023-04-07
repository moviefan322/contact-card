// TODO: Install the following package:
import { openDB } from "idb";

// TODO: Complete the initDb() function below:
const initdb = async () =>
  openDB("contacts", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("contacts")) {
        console.log("contacts database already exists");
        return;
      }
      db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
      console.log("contacts database created");
    },
  });

// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email) => {
  const contactsDb = await openDB("contacts", 1);
  const tx = contactsDb.transaction("contacts", "readwrite");
  const store = tx.objectStore("contacts");
  const request = store.add({
    name,
    home,
    cell,
    email,
  });
  const result = await request;
  console.log("Successfully saved", result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  const contactsDb = await openDB("contacts", 1);
  const tx = contactsDb.transaction("contacts", "readonly");
  const store = tx.objectStore("contacts");
  const request = store.getAll();
  const result = await request;
  console.log("results:", result);
  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  const contactsDb = await openDB("contacts", 1);
  const tx = contactsDb.transaction("contacts", "readwrite");
  const store = tx.objectStore("contacts");
  const request = store.delete(id);
  const result = await request;
  console.log(result);
  return result;
};

initdb();
