import React, { useEffect, useState } from 'react'
import { ArrowLeft, Loader2Icon, EllipsisVertical } from 'lucide-react';
import { useChatStore } from '../store/chatStore'

function ChatContainer() {
  const { currentChat, allContacts, setCurrentChat } = useChatStore();
  const [chatInfo, setChatInfo] = useState(null);
  useEffect(() => {
    if (!currentChat) {
      setChatInfo(null);
      return;
    }

    const contact = allContacts.find(c => c._id === currentChat);
    setChatInfo(contact || null);
  }, [currentChat, allContacts]);
  return (
    <div className={`h-full flex flex-col ${(chatInfo === null) ? "items-center justify-center" : ""}`}>
      {chatInfo === null ? (<Loader2Icon className='animate-spin self-center ' size={30} />) : (
        <>
        {/* chat info */}
        <div className='bg-slate-900/40 min-h-15 flex p-3 pl-5  items-center justify-between gap-2'>
        <div className='flex items-center justify-center gap-3'> 
          
          <div onClick={() => setCurrentChat(null)} className='rounded-full hover:bg-gray-500/20 p-1'>
            <ArrowLeft size={30} strokeWidth={1.25} />
          </div>
          <div className='w-9 h-9 md:w-10 md:h-10 avtar rounded-4xl overflow-hidden'>
            <img src={chatInfo?.profilePic || "./avatar.png"} alt="pfp" />
          </div>
          <div className='max-w-full truncate '>
            <div className='text-sm md:text-[15px] font-sans font-bold text-clip overflow-hidden '>
              {chatInfo?.fullName}
            </div>
          </div>
        </div>
          <div onClick={() => null} className='rounded-full hover:bg-gray-500/20 p-1'>
            <EllipsisVertical />
          </div>
        </div>

        {/* chats */}
        <div>
            <div>

            </div>
        </div>
        {/* send msg area*/}
        <div>

        </div>
        </>
      )}
    </div>
  )
}

export default ChatContainer