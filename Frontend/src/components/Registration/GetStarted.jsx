import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GetStarted = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6fcf7] p-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-md border">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700">Welcome</h1>
          <p className="mt-2 text-gray-600 text-sm">
            Please login or create an account to continue
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Link to="/auth/login" className="w-full">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
              Login
            </Button>
          </Link>
          <Link to="/auth/signup" className="w-full">
            <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50" size="lg">
              Sign Up
            </Button>
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
