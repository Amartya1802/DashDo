import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  getFirestore,
  collection,
} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import app from "../../Auth/firebase";

const db = getFirestore(app);

const initialState = {
  value: [],
  saved: false,
};

export const getWebPins = createAsyncThunk("WebPin/fetch", async () => {
  const querySnapshot = await getDocs(
    collection(
      db,
      `users/${getAuth().currentUser.uid}/dashdo/WebPin/shortcut`
    )
  );

  let websiteUpdateArray = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    websiteUpdateArray.push(doc.data());
  });
  return websiteUpdateArray;
});

export const addWebPin = createAsyncThunk("WebPin/add", async (website) => {
  console.log("Inside add website");
  try {
    await setDoc(
      doc(
        db,
        `users/${getAuth().currentUser.uid}/dashdo/WebPin/shortcut/${
          website.name
        }`
      ),
      website
    );
    return website;
  } catch (error) {
    return website;
  }
});

export const removeWebPin = createAsyncThunk(
  "website/remove",
  async (name) => {
    console.log("removing :", name);
    await deleteDoc(
      doc(
        db,
        `users/${getAuth().currentUser.uid}/dashdo/WebPin/shortcut/${name}`
      )
    );
    return name;
  }
);

export const WebpinSlice = createSlice({
  name: "WebPin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWebPin.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(removeWebPin.fulfilled, (state, action) => {
        state.value = state.value.filter(
          (item) => item.name !== action.payload
        );
      })
      .addCase(getWebPins.fulfilled, (state, action) => {
        state.value = action.payload;
      });
  },
});

export const selectWebsite = (state) => state.website.value;

export default WebpinSlice.reducer;