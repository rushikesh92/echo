import React from 'react'
import { MessageCircleMore } from 'lucide-react'
function NoChatPlaceholder() {
  return (
    <div className='h-full w-full  flex items-center justify-center text-center'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <MessageCircleMore size={70}/>
        <div className='text-3xl'>QuickChat</div>
        <p>Choose contact from sidebar to start conversation</p>
      </div>
    </div>
  )
}

export default NoChatPlaceholder