import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, User, Lock, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { registerUser } from "@/redux/store/auth-slice";
import { useDispatch } from "react-redux";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role:"user"
  });

  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };
  const handleRoleChange = (e) => {
    setSignupInfo({ ...signupInfo, role: e.target.value });
  };

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(signupInfo)).then((data) => {
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
  
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          {[
            { label: "Full Name", type: "text", name: "name", icon: <User /> },
            { label: "Email", type: "email", name: "email", icon: <Mail /> },
            { label: "Phone", type: "tel", name: "phone", icon: <Phone /> },
            { label: "Address", type: "text", name: "address", icon: <MapPin /> },
          ].map(({ label, type, name, icon }) => (
            <div key={name} className="relative">
              <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
              <input
                className="pl-10 w-full border p-2 rounded"
                type={type}
                name={name}
                placeholder={label}
                value={signupInfo[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <Lock />
            </span>
            <input
              className="pl-10 pr-10 w-full border p-2 rounded"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={signupInfo.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="user"
                checked={signupInfo.role === "user"}
                onChange={handleRoleChange}
              />
              <span className="ml-2">User</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={signupInfo.role === "admin"}
                onChange={handleRoleChange}
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>
          <button type="submit" className="w-full bg-black text-white p-2 rounded" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

// export default SignupPage;