"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, User, Lock, Phone, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner"

const SignupPage=()=> {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState("user")
  const [signupInfo,setsignupInfo]=useState({
    name:"",
    email:"", 
    password:"",
    phone:"",
    address:"",
    role:"",
  })
  const handleChange=(e)=>{
    const {name,value}=e.target;
    const newsignupInfo={...signupInfo,[name]:value}
    setsignupInfo(newsignupInfo);
  }
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    const { name, email, password,phone,address } = signupInfo;
    if (!name || !email || !password || !phone || !address) {
        setIsLoading(false)
        return handleError('name, email,phone, password and address  are required')
    }
    try {
        const url = `/auth/signup`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        });
        const result = await response.json();
        const { success, message, error } = result;
        if (success) {
            handleSuccess(message);
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        } else if (error) {
            const details = error?.details[0].message;
            handleError(details);
        } else if (!success) {
            handleError(message);
        }
        console.log(result);
    } catch (err) {
        handleError(err);
    }
    
  }

  const handleGoogleSignup = () => {
    setIsLoading(true)

    // Simulate Google signup process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Google signup successful",
        description: `Your ${role} account has been created with Google.`,
      })
      navigate("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input id="name" 
                onChange={handleChange} type="text" placeholder="Name" 
                value={signupInfo.name}
                className="pl-10" 
                required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input id="email" 
                onChange={handleChange}type="email" placeholder="email" 
                value={signupInfo.email}className="pl-10" 
                required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input id="password"
                onChange={handleChange}
                value={signupInfo.password}
                 type={showPassword ? "text" : "password"} className="pl-10 pr-10" required />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input id="phone"
                value={signupInfo.phone}
                onChange={handleChange} type="tel" placeholder="phone number" className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                onChange={handleChange}
                id="address" type="text" placeholder="Address" 
                value={signupInfo.address}className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup defaultValue="user" value={role} onValueChange={setRole} className="flex">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="cursor-pointer">
                    User
                  </Label>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="cursor-pointer">
                    Admin
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <Button type="submit" className="w-full bg-black text-white" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="relative flex items-center justify-center">
          <Separator className="absolute w-full" />
          <span className="relative bg-white px-2 text-sm text-gray-500">Or continue with</span>
        </div>

        <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignup} disabled={isLoading}>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Sign up with Google
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    <Toaster/>
    </div>
  )
}

export default SignupPage;