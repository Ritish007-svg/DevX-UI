import {createSlice} from "@reduxjs/toolkit"
const requestSlice=createSlice({
name:"requests",
initialState:null,
reducers:
  {
    addRequests:(state,action)=>
    {
      return action.payload;
    },
    removeRequests:(state,action)=>
    {
      return state.filter((r)=>r._id!==action.payload);
    },
    // wipes the whole list back to "not loaded yet" (used on logout)
    clearRequests:()=>
    {
      return null;
    }
  }
})

export const {addRequests,removeRequests,clearRequests} =requestSlice.actions;
export default requestSlice.reducer; 