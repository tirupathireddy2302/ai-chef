import {collection,addDoc,getDocs,deleteDoc,doc} from "firebase/firestore";

import { db } from "../firebase";

export const saveGroceryItem =
  async (
    userId,
    item
  ) => {

    await addDoc(

      collection(
        db,
        "users",
        userId,
        "groceryItems"
      ),

      item

    );

  };

export const getGroceryItems =
  async (
    userId
  ) => {

    const snapshot =
      await getDocs(

        collection(
          db,
          "users",
          userId,
          "groceryItems"
        )

      );

    return snapshot.docs.map(
      doc => ({

        id: doc.id,

        ...doc.data()

      })
    );

  };

export const deleteGroceryItem =
  async (
    userId,
    itemId
  ) => {

    await deleteDoc(

      doc(
        db,
        "users",
        userId,
        "groceryItems",
        itemId
      )

    );

  };