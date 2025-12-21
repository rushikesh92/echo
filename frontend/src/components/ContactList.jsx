import React, { useEffect } from 'react'
import { useChatStore } from '../store/chatStore'
import ChatsLoadingSkeleton from './ChatsLoadingSkeleton';

function ContactList() {
  const { allContacts, loadAllContacts, setCurrentChat, isLoadingContacts } = useChatStore();
  useEffect(() => {
    loadAllContacts();
  }, [])
  return (
    
    <div className='h-full flex flex-col gap-2'>
      {isLoadingContacts ? <ChatsLoadingSkeleton/> : (
      <ul className='flex flex-col gap-2'>
        {allContacts.length > 0 ? (allContacts.map((contact) => (
          <li key={contact._id} onClick={()=>(setCurrentChat(contact._id))}>
            <div className='flex align-middle justify-left gap-3 bordoer  rounded p-1 pl-2 hover:bg-gray-500/20'>
              <div className='w-9 h-9 overflow-hidden rounded-4xl'>  <img src={contact.profilePic || "./avatar.png"} className='h-full cover' alt="pfp" /></div>
              <div className='flex flex-col align-middle justify-center'>
                <p className='text-sm'>{contact.fullName}</p >
                <p className='text-[13px] text-slate-200/70  font-extralight'>offline</p >

              </div>
            </div>
          </li>
        ))) : <p>No contacts</p>}
      </ul>
      )}
    </div>
  )
}

export default ContactList