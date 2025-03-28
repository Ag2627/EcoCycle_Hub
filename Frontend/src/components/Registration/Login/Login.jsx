import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, loginUser } from "@/redux/store/auth-slice";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const initialState = {
  email: "",
  password: "",
};



const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState(initialState);
  const {user}= useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    setIsLoading(false);

    dispatch(loginUser(loginInfo)).then((data) => {
      
      
          if (data?.payload?.success) {
            toast({
              title: data?.payload?.message,
            });
            navigate("/user/dashboard");
          } else {
            toast({
              title: data?.payload?.message,
              variant: "destructive",
            });
          }
        });
  };

  const handleGoogleLogin = async (googleUser) => {
    try {
        const decoded = jwtDecode(googleUser.credential); 
        dispatch(googleLogin({ email: decoded.email })).then((data) => {  
    
          if (data?.payload?.success) {
            toast({ 
              title: data?.payload?.message,
              }); 

            navigate("/user/dashboard");
          } else {  
            toast({
              title: data?.payload?.message,
              variant: "destructive",
            }); 
          }
        });

      }
    catch(error){
      console.log(error);
    };
  }
  const handleGoogleFailure = () => {
    toast({ title: "Google login failed", variant: "destructive" });
  };

  console.log(user);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="mt-2 text-gray-600">Welcome back! Please login to your account</p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={loginInfo.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password..."
                  value={loginInfo.password}
                  onChange={handleChange}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

         <Button type="submit" className="w-full bg-black text-white" disabled={isLoading}>
             {isLoading ? "Logging in..." : "Login"}
           </Button>
         </form>
         <div className="relative flex items-center justify-center">
           <Separator className="absolute w-full" />
           <span className="relative bg-white px-2 text-sm text-gray-500">Or continue with</span>
         </div>

        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleLogin} onError={handleGoogleFailure} />
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account? <Link to="/auth/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
