import React from 'react'
import {ArrowLeft, EllipsisVertical} from 'lucide-react'
import { useChatStore } from '../store/chatStore'

function ChatHeader() {
    const {currentChat , setCurrentChat} =useChatStore();
    return (
        <div className='bg-slate-900/20 min-h-15 flex p-3 pl-5  items-center justify-between gap-2'>
            <div className='flex items-center justify-center gap-3'>
                <div onClick={() => setCurrentChat(null)} className='rounded-full hover:bg-gray-500/20 p-1'>
                    <ArrowLeft size={30} strokeWidth={1.25} />
                </div>
                <div className='w-9 h-9 md:w-10 md:h-10 avtar rounded-4xl overflow-hidden'>
                    <img src={currentChat?.profilePic || "./avatar.png"} alt="pfp" />
                </div>
                <div className='max-w-full truncate '>
                    <div className='text-sm md:text-[15px] font-sans font-bold text-clip overflow-hidden '>
                        {currentChat?.fullName}
                    </div>
                </div>
            </div>
            {/* <div onClick={() => null} className='rounded-full hover:bg-gray-500/20 p-1'>
                <EllipsisVertical />
            </div> */}
        </div>
    )
}

export default ChatHeader