import { create } from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';
import { useChatStore } from './chatStore';
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";


export const useAuthStore = create((set, get) => ({
    user: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get('/auth/current-user');
            set({ user: res.data.user });
            get().connectSocket();

        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set({ user: null })
            get().disconnectSocket();
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (formdata) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', formdata);
            set({ user: res.data.user });
            toast.success('Account created successfully.')
        } catch (error) {
            console.log("Error in signup: ", error);
            if (error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);
        } finally {
            set({ isSigningUp: false });
        }

    },

    login: async (formdata) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post('/auth/login', formdata);
            set({ user: res.data.user });
            toast.success('Logged in successfully.')
            try {
                get().connectSocket();
            } catch (error) {
                console.log("Error in login connectSocket: ", error);
            }
        } catch (error) {
            console.log("Error in login: ", error);
            if (error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post('auth/logout');
            set({ user: null })

            useChatStore.getState().setCurrentChat(null);
            toast.success("Logged out successfully")
            get().disconnectSocket();
        } catch (error) {
            console.log("Error in logout: ", error);
            toast.error("Error logging out");

        }
    },

    updateProfilePic: async (profilePic) => {
        try {
            const res = await axiosInstance.patch("auth/update-profile-pic", { profilePic });
            toast.success("Profile picture updated")

        } catch (error) {
            console.log("Error in updateProfilePic : ", error);
            toast.error("Error updating profile pic");
            throw error;
        }
    },

    connectSocket: async () => {
        const { user } = get();
        if (!user || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            withCredentials: true,
            transports: ["websocket"],
        });

        set({ socket: socket });

        socket.on("onlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: async () => {
        const socket = get().socket;
        if (socket) {
            socket.disconnect();
            set({ socket: null, onlineUsers: [] });
        }
    },


}))