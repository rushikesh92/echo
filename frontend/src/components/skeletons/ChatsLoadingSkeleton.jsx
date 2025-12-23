import React from 'react'

function ChatsLoadingSkeleton() {
  return (
    <div className='space-y-2'>
      {
        [1,2,3,4].map((item)=>(
          <div key={item} className='ml-2 p-1 rounded-lg animate-pulse'>
              <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-700/70 rounded-full"></div>
            <div className="flex-1">
              <div className="h-3 bg-slate-700/50 rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-slate-700/90 rounded w-1/4"></div>
            </div>
          </div>
          </div>
        ))
      }

    </div>
  )
}

export default ChatsLoadingSkeleton