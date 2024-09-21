import { createSlice, configureStore } from "@reduxjs/toolkit";

let mySlice = createSlice({
  name: "store",
  initialState: {
    user: [],
  },
  reducers: {
    addUser(state, action) {
      state.user.push(action.payload);
      // console.log(state.user);
    },
    deleteUser(state, action) {
      state.user = state.user.filter((val) => val.name !== action.payload);
    },
    setDocName(state, action) {
      let { selecteName, docName } = action.payload;
      let findUser = state.user.find((e) => e.name === selecteName);
      if (findUser) {
        findUser.docName.push(docName);
        // console.log(state.user);
      }
    },
  },
});

export let myReducers = mySlice.actions;

let Store = configureStore({
  reducer: mySlice.reducer,
});

export default Store;
