import { createSlice } from "@reduxjs/toolkit";

const Feedslice=createSlice({
  name:'feed',
  initialState:null,
  reducers:{
    showFeed:(state,action)=>
    {
      return action.payload;
    },
    removeFeed:()=>
    {
      return null;
    },
    removeUserFromFeed:(state,action)=>
    {
      return state?state.filter((user)=>user._id!==action.payload):state;
    }
  }
})

export const { showFeed,removeFeed,removeUserFromFeed} = Feedslice.actions;

export default Feedslice.reducer;







