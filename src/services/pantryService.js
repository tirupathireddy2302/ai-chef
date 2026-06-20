import {collection,addDoc,getDocs,deleteDoc,doc} from "firebase/firestore";
import { db } from "../firebase";

export const savePantryItem =
  async (userId, item) => {

    await addDoc(
      collection(
        db,
        "users",
        userId,
        "pantry"
      ),
      item
    );

  };

export const getPantryItems =
  async (userId) => {

    const snapshot =
      await getDocs(
        collection(
          db,
          "users",
          userId,
          "pantry"
        )
      );

    return snapshot.docs.map(
      doc => ({
        id: doc.id,
        ...doc.data()
      })
    );

  };

export const deletePantryItem =
  async (
    userId,
    itemId
  ) => {

    await deleteDoc(
      doc(
        db,
        "users",
        userId,
        "pantry",
        itemId
      )
    );

  };