import {create} from 'zustand';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create( (set)=>({
    user: null,
    isCheckingAuth: true,
    isSigningUp:false,
    isLoggingIn:false,

    checkAuth: async ()=>{
        set({isCheckingAuth:true});
        try {
            const res = await axiosInstance.get('/auth/current-user');
            set( {user: res.data.user });
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set( { user :null } )
        }finally{ 
            set( {isCheckingAuth: false});
        }
    },

    signup: async (formdata)=>{
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post('/auth/signup' , formdata);
            set({user:res.data.user});
            toast.success('Account created successfully.')
        } catch (error) {
            console.log("Error in signup: ", error);
            if(error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);
        } finally{
            set({isSigningUp :false});
        }

    },

    login: async(formdata)=>{
        set({isLoggingIn:true})
        try {
           const res = await axiosInstance.post('/auth/login',formdata);
           set({user:res.data.user});
           toast.success('Logged in successfully.')

        } catch (error) {
            console.log("Error in login: ", error); 
            if(error.response)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);           
        } finally{
            set( {isLoggingIn: false})
        }
    }
 

}))