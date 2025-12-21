import React from 'react'
import ChatList from './ChatList'
import ContactList from './ContactList'
import { useChatStore } from '../store/chatStore'

function TabSwitch() {
  const {activeTab, setActiveTab} = useChatStore();
  return (
    <div role="tablist" className="tabs tabs-border flex justify-evenly border-t  border-t-gray-100/20 pt-2" >

      <a role="tab" className={`tab ${ activeTab ==="chats" ? "tab-active":""}`}  onClick={()=>(setActiveTab("chats"))} >Chats</a>
      <a role="tab" className={`tab ${ activeTab ==="contacts" ? "tab-active":""}`} onClick={()=>(setActiveTab("contacts"))}>Contacts</a>
    </div>
  )
}

export default TabSwitch