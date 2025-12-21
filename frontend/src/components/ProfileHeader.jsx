import React, { useRef, useState } from 'react'
import { LogOutIcon, Volume2Icon, VolumeOff, CircleUserRound, DotIcon, Pen } from 'lucide-react'
import { useChatStore } from '../store/chatStore'
import { useAuthStore } from '../store/authStore';

function ProfileHeader() {

    const fileInputRef = useRef(null);

    const { isVolumeOn, toggleVolume } = useChatStore();
    const { logout, user ,updateProfilePic} = useAuthStore();
    const [selectedImage , setSelectedImage] = useState(null);

     const handleImageUpload =(e)=>{
        try {
            const file = e.target.files[0];
            if(!file) return;

            const reader = new FileReader()
            reader.readAsDataURL(file);

            reader.onloadend = async()=>{
                const base64Img = reader.result;
                await updateProfilePic(base64Img);
                setSelectedImage(base64Img);
            }
        } catch (error) {
            console.log("Error while uploading image", error);
        }
    }

    return (
        <div className='w-full flex flex-col md:flex-row justify-between p-5'>
            <div className='flex gap-2'>
                <input type='file' accept='image/*' ref={fileInputRef} hidden onChange={handleImageUpload}></input>
                <div className='w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden relative group' onClick={()=>fileInputRef.current.click()}>
                    { ( !user.profilePic && !selectedImage )? 
                            (<CircleUserRound className='w-8 h-8 md:w-11 md:h-11 group-hover:blur'/> ):
                            ( <img className='object-center object-cover group-hover:blur' src={selectedImage ||user.profilePic} alt="pfp" />)
                    }
                    <Pen className='absolute top-2 left-2 w-3 h-4 md:top-3 md:left-3 md:w-6 md:h-6  opacity-0   group-hover:opacity-90  rounded-lg' strokeWidth={2} />
                </div>
                <div className=''>
                    <p className='font-bold  max-w-18 md:max-w-30 truncate font-sans '>{user.fullName} </p>
                    <p className='text-sm font-lighth text-slate-400 flex gap-0'><DotIcon  color='lightgreen' strokeWidth={5}/><p>online</p></p>
                </div>
            </div>
            <div className='flex gap-3'>
                <button onClick={logout}>
                    <LogOutIcon strokeWidth={1}/>
                </button>
                <button onClick={()=> { 
                    const clickSound = new Audio('/sounds/click_sound.mp3')
                        clickSound.currentTime =0.1;
                        clickSound.play().catch((e)=>console.log("Audio play failed" , e))
                        toggleVolume()
                }}>
                    {isVolumeOn ? <Volume2Icon strokeWidth={1}/> : <VolumeOff strokeWidth={1}/>}
                </button>
            </div>
        </div>
    )
}

export default ProfileHeader