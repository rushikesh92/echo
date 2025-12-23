import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get)=>({
    chats:[],
    allContacts: [],
    currentChat: null,
    currentChatMessages : [],
    activeTab : "chats",

    isLoadingChats : false,
    isLoadingContacts: false,
    isLoadingMessages : false,
    isSendingMessage : false,
    isVolumeOn: true,

    loadChats: async ()=>{
        set( { isLoadingChats : true});
        try {
            const res = await axiosInstance.get('/messages/chats');
            set({ chats: res.data.chats})
            
        } catch (error) {
            console.log("Error in loadChats : " , error);  

            if(error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);

            set({ chats: [] });
        } finally {
            set( { isLoadingChats : false});
        }
    },

    loadAllContacts: async ()=>{
        set( { isLoadingContacts : true});
        try {
            const res = await axiosInstance.get('/messages/contacts');
            set({ allContacts: res.data.contacts})
            
        } catch (error) {
            console.log("Error in loadAllContacts : " , error);  

            if(error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);

            set({ allContacts: [] });
        } finally {
            set( { isLoadingContacts : false});
        }
    },

    loadCurrentChatMessages : async (id)=>{
        set( { isLoadingMessages : true});
        try {
            const res = await axiosInstance.get(`/messages/${id}`  );
            set({ currentChatMessages: res.data.messages})
            
        } catch (error) {
            console.log("Error in loadCurrentChatMessages : " , error);  

            if(error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);

            set({ currentChatMessages: [] });
        } finally {
            set( { isLoadingMessages : false});
        }
    },

    sendMessage : async (id)=>{
        set( { isSendingMessage : true});
        try {
            const res = await axiosInstance.get('/messages/send' ,{
                params:{
                    receiverId:id
                }
            } );
            toast.success(error.response.data.message);
        } catch (error) {
            console.log("Error in sendMessage : " , error);  

            if(error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);

        } finally {
            set( { isSendingMessage : false});
        }
    },

    setActiveTab : (tab)=>( set( {activeTab:tab} )),

    setCurrentChat : (chat)=>( set( {currentChat: chat } )),

    toggleVolume: ()=>(set( {isVolumeOn : !get().isVolumeOn})),
}))