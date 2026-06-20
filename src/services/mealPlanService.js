import {collection,addDoc,getDocs,deleteDoc,doc} from "firebase/firestore";
import { db } from "../firebase";
export const saveMealPlan =
  async (
    userId,
    mealPlan
  ) => {

    await addDoc(

      collection(
        db,
        "users",
        userId,
        "mealPlans"
      ),

      mealPlan

    );

  };

export const getMealPlans =
  async (
    userId
  ) => {

    const snapshot =
      await getDocs(

        collection(
          db,
          "users",
          userId,
          "mealPlans"
        )

      );

    return snapshot.docs.map(
      doc => ({

        id: doc.id,

        ...doc.data()

      })
    );

  };

export const deleteMealPlan =
  async (
    userId,
    planId
  ) => {

    await deleteDoc(

      doc(
        db,
        "users",
        userId,
        "mealPlans",
        planId
      )

    );

  };