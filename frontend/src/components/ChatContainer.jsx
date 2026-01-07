import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowLeft, EllipsisVertical } from 'lucide-react';
import { useChatStore } from '../store/chatStore'
import { useAuthStore } from '../store/authStore';
import { MessageSkeleton, ChatHeader, EmptyChatHistory, MessageInput } from './index';

function ChatContainer() {
  const { currentChat, allContacts, chats, setCurrentChat, currentChatMessages, isLoadingMessages, loadCurrentChatMessages, subscribeToMessages,unsubscribeFromMessages } = useChatStore();
  const { user } = useAuthStore()

  const messagesContainerRef = useRef(null);

  const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    loadCurrentChatMessages(currentChat._id);
    subscribeToMessages();

      return () => unsubscribeFromMessages();
  }, [currentChat, loadCurrentChatMessages]);

  useLayoutEffect(() => {
    if (!messagesContainerRef.current) return;

    if (isLoadingMessages) return;

    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;

  }, [currentChatMessages, isLoadingMessages, currentChat, subscribeToMessages, unsubscribeFromMessages]);

  return (
    <div className={`h-full flex flex-col min-h-0`}>


      <ChatHeader />

      <div
        ref={messagesContainerRef}
        className=' flex-1 min-h-0 overflow-y-auto bg-slate-600/10 p-2 '
      >

        {isLoadingMessages ? (
          <MessageSkeleton />
        ) : (

          currentChatMessages.length > 0 ? (

            <div className="flex  flex-col gap-2 p-2">
              {currentChatMessages.map((msg) => (
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
                    <p className='text-[9px] mt-0 opacity-75 '>{formatTime(msg.createdAt)}</p>
                  </div>
                </div>
              ))
              }
            </div>
          )
            : (<EmptyChatHistory />)

        )}
      </div>

      <MessageInput />


    </div>
  )
}

export default ChatContainer
