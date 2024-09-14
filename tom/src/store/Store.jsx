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
    deleteUser(store,action){
      store.user = store.user.filter((val)=>val.name !== action.payload)
    }
  },
});

export let myReducers = mySlice.actions;

let Store = configureStore(mySlice);

export default Store;
