import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebase";

export const saveFavorite =
  async (
    userId,
    recipe
  ) => {

    await addDoc(

      collection(
        db,
        "users",
        userId,
        "favorites"
      ),

      recipe

    );

  };

export const getFavorites =
  async (
    userId
  ) => {

    const snapshot =
      await getDocs(

        collection(
          db,
          "users",
          userId,
          "favorites"
        )

      );

    return snapshot.docs.map(
      doc => ({

        id: doc.id,

        ...doc.data()

      })
    );

  };

export const deleteFavorite =
  async (
    userId,
    favoriteId
  ) => {

    await deleteDoc(

      doc(
        db,
        "users",
        userId,
        "favorites",
        favoriteId
      )

    );

  };