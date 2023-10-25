import { createAsyncThunk } from "@reduxjs/toolkit";
import appAxios from "../../helpers/axios";

export const getChats = createAsyncThunk("chat/getChats", async () => {
  try {
    const response = await appAxios.get("/chat/");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("failed to get chats");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
});
