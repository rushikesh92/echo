import React, { useEffect } from 'react'
import { useChatStore } from '../store/chatStore'
import { useAuthStore } from '../store/authStore';
import { Container, ProfileHeader, TabSwitch, ChatList, ContactList, ChatContainer, NoChatPlaceholder } from '../components';

function ChatPage() {
  const { activeTab, currentChat } = useChatStore();

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full  max-w-6xl md:h-162.5 h-162.5">
        <Container>
          <div className={`w-full  md:w-70 bg-slate-800/10 backdrop-blur-sm  flex-col ${ currentChat ? "hidden md:flex": "flex"}`}>
            <ProfileHeader />
            <TabSwitch />
            <div className='flex-1 overflow-y-auto p-4 space-y-2'>
              {activeTab === 'chats' ? <ChatList /> : <ContactList />}
            </div>
          </div>
          <div className={`flex-1  flex-col  md:block  bg-slate-900/10 backdrop-blur-sm ${currentChat? "flex ": "hidden md:flex"} `}>
            {currentChat ? <ChatContainer /> : <NoChatPlaceholder />}
          </div>
        </Container>
      </div>
    </div>

  )
}

export default ChatPage