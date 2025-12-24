import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore";

export const useChatStore = create((set, get) => ({
    chats: [],
    allContacts: [],
    currentChat: null,
    activeChatRequestId: null,
    currentChatMessages: [],
    activeTab: "chats",

    isLoadingChats: false,
    isLoadingContacts: false,
    isLoadingMessages: false,
    isSendingMessage: false,
    isVolumeOn: true,

    loadChats: async () => {
        set({ isLoadingChats: true });
        try {
            const res = await axiosInstance.get('/messages/chats');
            set({ chats: res.data.chats })

        } catch (error) {
            console.log("Error in loadChats : ", error);

            if (error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);

            set({ chats: [] });
        } finally {
            set({ isLoadingChats: false });
        }
    },

    loadAllContacts: async () => {
        set({ isLoadingContacts: true });
        try {
            const res = await axiosInstance.get('/messages/contacts');
            set({ allContacts: res.data.contacts })

        } catch (error) {
            console.log("Error in loadAllContacts : ", error);

            if (error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);

            set({ allContacts: [] });
        } finally {
            set({ isLoadingContacts: false });
        }
    },

    loadCurrentChatMessages: async (id) => {
        set({ isLoadingMessages: true, activeChatRequestId: id });
        try {
            const res = await axiosInstance.get(`/messages/${id}`);
            if (get().activeChatRequestId !== id) return; //new chat opened before completion of previous chat so do not update messages 
            set({ currentChatMessages: res.data.messages })

        } catch (error) {
            console.log("Error in loadCurrentChatMessages : ", error);

            if (get().activeChatRequestId !== id) return;
            if (error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);
            set({ currentChatMessages: [] });
        } finally {
            if (get().activeChatRequestId === id)
                set({ isLoadingMessages: false });
        }
    },

    sendMessage: async (messageData) => {
        set({ isSendingMessage: true });
        const { currentChat, currentChatMessages } = get();
        const { user } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const message = {
            _id: tempId,
            senderId: user._id,
            receiverId: currentChat._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        };
        set({ currentChatMessages: [...currentChatMessages, message] });

        try {
            const res = await axiosInstance.post(`/messages/send/${currentChat._id}`, messageData);
            set({
                currentChatMessages: get().currentChatMessages.map(msg =>
                    msg._id === tempId ? res.data.sentMessage : msg
                )
            });
        } catch (error) {
            set({
                currentChatMessages: get().currentChatMessages.filter(
                    msg => msg._id !== tempId
                )
            });
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    setActiveTab: (tab) => (set({ activeTab: tab })),

    setCurrentChat: (chat) => (set({ currentChat: chat })),

    toggleVolume: () => (set({ isVolumeOn: !get().isVolumeOn })),
}))