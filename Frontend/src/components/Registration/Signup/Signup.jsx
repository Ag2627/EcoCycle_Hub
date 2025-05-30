import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, User, Lock, Phone, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { registerUser, clearAuthError } from "@/redux/store/auth-slice";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "user",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
<<<<<<< HEAD
=======
  const { isLoading: authIsLoading, error: authError, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const showToast = (title, description, variant = "default") => {
  toast[variant === "destructive" ? "error" : variant === "success" ? "success" : "message"](description, {
    description: title,
  });
};

>>>>>>> f4a5bde73100369344612b743c9ed4116719244b

  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setSignupInfo({ ...signupInfo, role: e.target.value });
  };

<<<<<<< HEAD
  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
=======
  useEffect(() => {
    if (authError) {
      showToast("Signup Failed", authError, "destructive");
      dispatch(clearAuthError());
    }
  }, [authError, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      showToast("Signup Successful!", "Redirecting to dashboard...", "success");
      navigate("/user/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!signupInfo.name || !signupInfo.email || !signupInfo.password) {
      showToast("Validation Error", "Name, Email, and Password are required.", "destructive");
      return;
    }

    if (signupInfo.password.length < 6) {
      showToast("Validation Error", "Password must be at least 6 characters.", "destructive");
      return;
    }

>>>>>>> f4a5bde73100369344612b743c9ed4116719244b
    dispatch(registerUser(signupInfo)).then((data) => {
      setIsLoading(false);
      if (data?.payload?.success) {
<<<<<<< HEAD
        toast({ title: data?.payload?.message });
        navigate("/user/dashboard");
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
=======
        navigate("/user/dashboard");
>>>>>>> f4a5bde73100369344612b743c9ed4116719244b
      }
    });
  };

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen items-center justify-center bg-[#f6fcf7] p-4">
      <div className="w-full max-w-md bg-white p-6 shadow-md rounded-xl border">
        <h1 className="text-3xl font-bold text-center text-green-700">Create Account</h1>
        <form onSubmit={onSubmit} className="space-y-4 mt-6">
=======
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>

        <form onSubmit={onSubmit} className="space-y-4 mt-4">
>>>>>>> f4a5bde73100369344612b743c9ed4116719244b
          {[
            { label: "Full Name", type: "text", name: "name", icon: <User /> },
            { label: "Email", type: "email", name: "email", icon: <Mail /> },
            { label: "Phone", type: "tel", name: "phone", icon: <Phone /> },
            { label: "Address", type: "text", name: "address", icon: <MapPin /> },
          ].map(({ label, type, name, icon }) => (
            <div key={name} className="relative">
              <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
              <input
                className="pl-10 w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                type={type}
                name={name}
                placeholder={label}
                value={signupInfo[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

<<<<<<< HEAD
=======
          {/* Password Field */}
>>>>>>> f4a5bde73100369344612b743c9ed4116719244b
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <Lock />
            </span>
            <input
              className="pl-10 pr-10 w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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

<<<<<<< HEAD
          <div className="flex space-x-6 pt-2">
            {["user", "admin"].map((role) => (
              <label key={role} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={signupInfo.role === role}
                  onChange={handleRoleChange}
                  className="accent-green-600"
                />
                <span className="ml-2 capitalize text-gray-700">{role}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className={`w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded transition-all duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
=======
          {/* Role Radio */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded"
            disabled={authIsLoading}
          >
            {authIsLoading ? "Creating account..." : "Create Account"}
>>>>>>> f4a5bde73100369344612b743c9ed4116719244b
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-green-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
