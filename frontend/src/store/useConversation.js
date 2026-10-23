import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setselectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  reset: () => set({ selectedConversation: null, messages: [] }),
}));

export default useConversation;
