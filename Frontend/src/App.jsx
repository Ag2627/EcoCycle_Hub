import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/User/Home/Home';
import RewardsPage from './components/User/Rewards/RewardsPage';
// import LoginPage from './components/Registration/Login/Login';
// import SignupPage from './components/Registration/Signup/Signup';
import GetStarted from './components/Registration/GetStarted';
const router=createBrowserRouter(
  [
    {path:'/',element:<GetStarted/>},
    // {path:'/auth',element:<GetStarted/>,children:[
    //   {path:'/login',element:<LoginPage/>},
    // {path:'/signup',element:<SignupPage/>}
    // ]},
    {path:'user/dashboard',element:<Home/>},
    {path:'user/rewards', element:<RewardsPage/>}
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
