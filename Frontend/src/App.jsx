import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import LoginPage from './components/Registration/Login/Login';
import SignupPage from './components/Registration/Signup/Signup';
import GetStarted from './components/Registration/GetStarted';
import ReportPage from './components/report/page';
const router=createBrowserRouter(
  [
    {path:'/',element:<GetStarted/>},
    {path:'/auth',element:<GetStarted/>,children:[
      {path:'/login',element:<LoginPage/>},
    {path:'/signup',element:<SignupPage/>}
    ]},
    {path:'user/dashboard',element:<Home/>},
    {path:'user/report',element:<ReportPage/>}
    
  ]
)


function App() {
  return (
    <>
  
    
    <RouterProvider router={router}></RouterProvider>

    </>
  )
   
}

export default App
