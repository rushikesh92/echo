import {create} from 'zustand';
import axiosInstance from '../lib/axios';

export const useAuthStore = create( (set)=>({
    user: null,
    isCheckingAuth: true,

    checkAuth: async ()=>{
        try {
            const res = await axiosInstance.get('/auth/current-user');
            set( {user: res.data.user });
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set( { user :null } )
        }finally{
            set( {isCheckingAuth: false})
        }
    },

}))