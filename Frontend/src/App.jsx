import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
const router=createBrowserRouter(
  [{path:'',element:<Home/>}]
)


function App() {
  return (
    <>
  

    <RouterProvider router={router}></RouterProvider>

    </>
  )
   
}

export default App
