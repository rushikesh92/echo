import React, { useEffect } from 'react'
import { useChatStore } from '../store/chatStore'
import {CirclePlus,DotIcon} from 'lucide-react'
import {ChatsLoadingSkeleton} from './index';
import { useAuthStore } from '../store/authStore';

function ChatList() {
  const { chats, loadChats, setCurrentChat, setActiveTab, isLoadingChats,loadAllContacts } = useChatStore();
  const {onlineUsers} = useAuthStore();
  useEffect(() => {
    loadChats();
    loadAllContacts();
  }, [])
  return (
    <div className='flex flex-col gap-2 h-full'>
       {isLoadingChats ? <ChatsLoadingSkeleton/> : (
      <ul className='h-full'>
        {chats.length > 0 ? (chats.map((chat) => (
          <li key={chat._id} onClick={()=>(setCurrentChat(chat))}>
            <div className='flex align-middle justify-left gap-3 bordoer  rounded p-1 pl-2 hover:bg-gray-500/20'>
              <div className='w-9 h-9 overflow-hidden rounded-4xl'>  <img src={chat.profilePic || "./avatar.png"} className='h-full cover' alt="pfp" /></div>
              <div className='flex flex-col align-middle justify-center'>
                <p className='text-sm'>{chat.fullName}</p >
                <p className='text-[13px] text-slate-200/70 font-extralight'>
                   {onlineUsers.includes(chat._id) ? <p className='text-emerald-500'>online</p> : <p>offline</p> }</p >

              </div>
            </div>
          </li>
        ))) : <div className= 'h-full flex  gap-2 flex-col items-center justify-center'>
                <CirclePlus className='opacity-90 hover:opacity-100 hover:scale-110' onClick={()=>(setActiveTab("contacts"))} size={45} />
                <p className='text-center text-sm p-2'>Select a contact from contacts to start chatting.</p>
            </div>}
      </ul>)}

    </div>
  )
}

export default ChatList