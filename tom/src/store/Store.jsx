import { createSlice, configureStore } from "@reduxjs/toolkit";

let mySlice = createSlice({
  name: "store",
  initialState: {
    user: [],
  },
  reducers: {
    addUser(store, action) {
      store.user.push(action.payload);
      // console.log(store.user);
    },
  },
});

export let myReducers = mySlice.actions;

let Store = configureStore(mySlice);

export default Store;
