import React from 'react'

function MessageSkeleton() {
  return (
    <div className='flex w-full flex-col gap-3 p-4 '>
        <div className='flex justify-start'>
             <div className='bg-gray-700/80 rounded-2xl animate-pulse h-8 w-40'></div>
        </div>
        <div className='flex justify-end'>
             <div className='bg-gray-700/80 rounded-2xl animate-pulse h-8 w-30'></div>
        </div>
        <div className='flex justify-end'>
             <div className='bg-gray-700/80 rounded-2xl animate-pulse h-8 w-45'></div>
        </div>
        <div className='flex justify-start'>
             <div className='bg-gray-700/80 rounded-2xl animate-pulse h-8 w-40'></div>
        </div>
        <div className='flex justify-end'>
             <div className='bg-gray-700/80 rounded-2xl animate-pulse h-8 w-40'></div>
        </div>
        <div className='flex justify-start'>
             <div className='bg-gray-700/80 rounded-2xl animate-pulse h-8 w-50'></div>
        </div>
        <div className='flex justify-end'>
             <div className='bg-gray-700/80 rounded-2xl animate-pulse h-30 w-50'></div>
        </div>
        <div className='flex justify-start'>
             <div className='bg-gray-700/80 rounded-2xl animate-pulse h-8 w-30'></div>
        </div>
        <div className='flex justify-end'>
             <div className='bg-gray-700/80 rounded-2xl animate-pulse h-8 w-30'></div>
        </div>
        <div className='flex justify-start'>
             <div className='bg-gray-700/80 rounded-2xl animate-pulse h-8 w-40'></div>
        </div>
       
    </div>
  )
}

export default MessageSkeleton