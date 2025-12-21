import React, { useEffect } from 'react'
import { useChatStore } from '../store/chatStore'
import { useAuthStore } from '../store/authStore';
import { Container, ProfileHeader, TabSwitch, ChatList, ContactList, ChatContainer, NoChatPlaceholder } from '../components';

function ChatPage() {
  const { activeTab, currentChat } = useChatStore();

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl md:h-[650px] h-[650px]">
        <Container>
          <div className='w-40 md:w-70 bg-slate-800/10 backdrop-blur-sm flex flex-col'>
            <ProfileHeader />
            <TabSwitch />
            <div className='flex-1 overflow-y-auto p-4 space-y-2'>
              {activeTab === 'chats' ? <ChatList /> : <ContactList />}
            </div>
          </div>
          <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
            {currentChat ? <ChatContainer /> : <NoChatPlaceholder />}
          </div>
        </Container>
      </div>
    </div>

  )
}

export default ChatPage