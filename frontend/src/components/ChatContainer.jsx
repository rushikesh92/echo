import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, EllipsisVertical } from 'lucide-react';
import { useChatStore } from '../store/chatStore'
import { useAuthStore } from '../store/authStore';
import { MessageSkeleton, ChatHeader, EmptyChatHistory } from './index';

function ChatContainer() {
  const { currentChat, allContacts, chats, setCurrentChat, currentChatMessages, isLoadingMessages, loadCurrentChatMessages } = useChatStore();
  const { user } = useAuthStore()

  // refs for fast, instant scroll
  const messagesContainerRef = useRef(null);
  const isInitialScrollRef = useRef(false);



  useEffect(() => {
    if (currentChat) isInitialScrollRef.current = true;//for auto scroll
    loadCurrentChatMessages(currentChat._id);
  }, [currentChat, loadCurrentChatMessages]);

  useLayoutEffect(() => {
    if (!messagesContainerRef.current) return;

    if (isLoadingMessages) return;

    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;

    isInitialScrollRef.current = false;
  }, [currentChatMessages, isLoadingMessages, currentChat]);

  return (
    <div className={`h-full flex flex-col`}>

      <>
        {/* chat info (header)*/}
        <ChatHeader />

        <div className='bg-slate-600/10 h-full'>

          {/* chats */}
          <div
            ref={messagesContainerRef}
            className=' h-[82%] overflow-y-auto'
          >
            {isLoadingMessages ? (
              <div className='h-full '><MessageSkeleton /></div>
            ) : (
              <div className="flex flex-col gap-2 p-2">

                {
                  currentChatMessages.length > 0 ? (

                    currentChatMessages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`flex ${msg.senderId === user._id ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[70%] px-2 py-1 rounded-lg text-sm ${msg.senderId === user._id ? "bg-blue-600/30 text-white rounded-br-none" : "bg-slate-700/40 text-white rounded-bl-none"}`} >
                          {msg.text ? (
                            <span>{msg.text}</span>
                          ) : (
                            <img src={msg.image} alt="img" className="max-w-40 rounded-lg" loading='lazy' />
                          )}
                        </div>
                      </div>
                    ))

                  )
                    : (<EmptyChatHistory />)
                }
              </div>
            )}
          </div>

          {/* send msg area*/}
          <div className=' absolute w-full bottom-0 z-10 min-h-[8%] bg-gray-900/10 border border-blue-800/50 rounded-3xl'>
          </div>
        </div>
      </>

    </div>
  )
}

export default ChatContainer
