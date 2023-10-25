import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getChats } from "./chatThunks";

interface chatState {
  chats: [];
}

const initialState: chatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChats.fulfilled, (state, action) => {
      console.log("chats from state", action.payload.data.chat);
      state.chats = action.payload.data.chats;
    });
  },
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
