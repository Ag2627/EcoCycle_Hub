import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const GetStarted=()=> {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="mt-2 text-gray-600">Please login or create an account to continue</p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link to="/auth/login" className="w-full">
            <Button className="w-full bg-black text-white " size="lg">
              Login
            </Button>
          </Link>
          <Link to="/auth/signup" className="w-full">
            <Button variant="outline" className="w-full" size="lg">
              Sign Up
            </Button>
          </Link>
         
        </div>
      </div>
    </div>
    
  )
}

export default GetStarted;