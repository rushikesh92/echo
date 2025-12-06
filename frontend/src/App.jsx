import { useEffect, useState } from 'react'
import './App.css'
import {Outlet} from 'react-router-dom'
import { useAuthStore } from './store/authStore'

function App() {

  const {user , isCheckingAuth , checkAuth} = useAuthStore();

  useEffect(()=>{
      checkAuth();
  },[])

 
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#7dd3fc33,transparent_60%),radial-gradient(circle_at_80%_70%,#fda4af33,transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(#ffffff05_1px,transparent_1px),linear-gradient(90deg,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px]" />        
      <Outlet/>
    </div>
  )
}

export default App
