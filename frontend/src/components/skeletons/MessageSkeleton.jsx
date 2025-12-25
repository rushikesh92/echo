import React from 'react'

function MessageSkeleton() {
  return (
    <div className='flex w-full flex-col gap-3 p-4 '>
        <div className='flex justify-start'>
             <div className='msg-skeleton h-8 w-40'></div>
        </div>
        <div className='flex justify-end'>
             <div className='msg-skeleton h-8 w-32'></div>
        </div>
        <div className='flex justify-end'>
             <div className='msg-skeleton h-8 w-48'></div>
        </div>
        <div className='flex justify-start'>
             <div className='msg-skeleton h-8 w-32'></div>
        </div>
        <div className='flex justify-end'>
             <div className='msg-skeleton h-8 w-40'></div>
        </div>
        <div className='flex justify-start'>
             <div className='msg-skeleton h-8 w-48'></div>
        </div>
        <div className='flex justify-end'>
             <div className='msg-skeleton h-24 w-48'></div>
        </div>
        <div className='flex justify-start'>
             <div className='msg-skeleton h-8 w-24'></div>
        </div>
        <div className='flex justify-end'>
             <div className='msg-skeleton h-8 w-24'></div>
        </div>
        <div className='flex justify-start'>
             <div className='msg-skeleton h-8 w-40'></div>
        </div>
       
    </div>
  )
}

export default MessageSkeleton