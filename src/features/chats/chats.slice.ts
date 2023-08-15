import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RealtimeChannel } from "@supabase/realtime-js";

interface IChatStore {
  messages: IMessage[];
  channel: RealtimeChannel | null;
}
const initialState: IChatStore = {
  messages: [],
  channel: null,
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
    setChannel(state, action: PayloadAction<RealtimeChannel>) {
      state.channel = action.payload;
    },
  },
});
export const {
  getMessages,
  addMessage,
  deleteMessage,
  addMessages,
  setChannel,
} = chatSlice.actions;
export default chatSlice.reducer;
