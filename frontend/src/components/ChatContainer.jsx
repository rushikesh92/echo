import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, EllipsisVertical } from 'lucide-react';
import { useChatStore } from '../store/chatStore'
import { useAuthStore } from '../store/authStore';
import { MessageSkeleton, ChatHeader, EmptyChatHistory, MessageInput } from './index';

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
            className='h-112 md:h-130 overflow-y-auto'
          >
            {isLoadingMessages ? (
              <div className='h-full '><MessageSkeleton /></div>
            ) : (
              <div className="flex  flex-col h-full gap-2 p-2">

                {
                  currentChatMessages.length > 0 ? (

                    currentChatMessages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`flex ${msg.senderId === user._id ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`flex flex-col max-w-60 h-auto px-2 py-1 rounded-lg text-sm ${msg.senderId === user._id ? "bg-sky-600/60 text-white rounded-br-none" : "bg-slate-700/40 text-white rounded-bl-none"}`} >
                          {msg.image &&
                            <img src={msg.image} alt="img" className="max-w-40 rounded-lg" loading='lazy' />
                          }
                          {msg.text &&
                            <p className='max-w-40 h-auto overflow-x-auto'>{msg.text}</p>
                          }
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
          <MessageInput />
        </div>
      </>

    </div>
  )
}

export default ChatContainer
