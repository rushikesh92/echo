import React from 'react'
import { MessageCircleMore } from 'lucide-react'
function NoChatPlaceholder() {
  return (
    <div className='h-full w-full  flex items-center justify-center text-center'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <MessageCircleMore size={60}/>
        <div className='text-4xl font-bold'>Echo</div>
        <p className='font-light'>Choose contact from sidebar to start conversation</p>
      </div>
    </div>
  )
}

export default NoChatPlaceholder