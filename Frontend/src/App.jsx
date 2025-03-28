import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/User/Home/Home';
import RewardsPage from './components/User/Rewards/RewardsPage';
import LoginPage from './components/Registration/Login/Login';
import SignupPage from './components/Registration/Signup/Signup';
import GetStarted from './components/Registration/GetStarted';
import ReportPage from './components/report/page';
import WasteSorting from './components/SortingGuide/WasteSorting';
const router=createBrowserRouter(
  [
    {path:'/',element:<GetStarted/>},
    {path:'/auth/login',element:<LoginPage/>},
    {path:'/auth/signup',element:<SignupPage/>},

    {path:'user/dashboard',element:<Home/>},
    {path:'user/report',element:<ReportPage/>},
    {path:'user/wastesorting',element:<WasteSorting/>},  
    
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
