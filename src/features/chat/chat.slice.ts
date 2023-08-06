import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IChatStore {
  messages: IMessage[];
}
const initialState: IChatStore = {
  messages: [],
};
const chatSlice = createSlice({
  initialState,
  name: "chat-messages",
  reducers: {
    getMessages(state, action: PayloadAction<IMessage[]>) {
      state.messages = action.payload;
    },
    addMessages(state, action: PayloadAction<IMessage[]>) {
      state.messages.push(...action.payload);
    },
    addMessage(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload);
    },
    deleteMessage(state, action: PayloadAction<string>) {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload
      );
    },
  },
});
export const { addMessage, deleteMessage, addMessages } = chatSlice.actions;
export default chatSlice.reducer;
