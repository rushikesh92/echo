import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import {ChatPage , LoginPage , SignUpPage} from './pages'
import {AuthLayout} from './components'

const  router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        element:<AuthLayout requiresAuth={true}/>,
        children:[
            {index:true, element: <ChatPage/> },
        ]
      },
      {
        element:<AuthLayout requiresAuth={false}/>,
        children:[
              { path:"/login",  element:<LoginPage/>  },
              { path:"/signup", element:<SignUpPage/> }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider  router={router}/>
  </StrictMode>,
)
