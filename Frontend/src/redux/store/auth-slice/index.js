import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Configure an Axios instance
const apiClient = axios.create({
    baseURL: "http://localhost:5000", // Your API base URL
    // withCredentials: true, // Use if your backend sets HttpOnly cookies for tokens
});

// Conceptual: Axios request interceptor to add JWT to headers
// This needs careful setup to access the token (from localStorage or Redux state)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Or get from Redux store if preferred
        if (token && config.headers) { // Check config.headers exists
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token:localStorage.getItem("token") || null,
  error:null,
};

export const registerUser = createAsyncThunk(
    "auth/register",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/auth/signup", formData);
            localStorage.setItem("token", response.data.token);
            return response.data; // Expects { success, message, token, data: user }
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Registration failed due to a network or server issue." });
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/auth/login", formData);
            localStorage.setItem("token", response.data.token);
            return response.data; // Expects { success, message, token, data: user }
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Login failed due to a network or server issue." });
        }
    }
);

export const googleLogin = createAsyncThunk(
    "auth/googleLogin",
    async (emailData, { rejectWithValue }) => { // Expects { email: "...", name: "..." (optional) }
        try {
            const response = await apiClient.post("/auth/google-login", emailData);
            localStorage.setItem("token", response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Google login failed." });
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            // Optional: Call backend logout if it does anything (like token blacklisting)
            await apiClient.post("/auth/logout");
            localStorage.removeItem("token");
            return { success: true, message: "Logout successful" };
        } catch (error) {
            localStorage.removeItem("token"); // Still clear client-side on error
            return rejectWithValue(error.response?.data || { message: "Logout failed but client session cleared." });
        }
    }
);

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token; // Get token from current state (already loaded from localStorage)
        if (!token) {
            return rejectWithValue({ success: false, message: "No token found for authentication." });
        }
        try {
            // apiClient should automatically send the token via interceptor
            const response = await apiClient.get("/auth/check-auth");
            // If backend refreshes token and sends it back:
            if (response.data.token) {
                 localStorage.setItem("token", response.data.token);
            }
            return response.data; // Expects { success, message, user, token (optional) }
        } catch (error) {
            localStorage.removeItem("token"); // If token is invalid, remove it
            return rejectWithValue(error.response?.data || { success: false, message: "Session validation failed." });
        }
    }
);
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },
        // manualLogout: (state) => { // If you need a synchronous logout for some reason
        //     state.user = null;
        //     state.token = null;
        //     state.isAuthenticated = false;
        //     state.isLoading = false;
        //     state.error = null;
        //     localStorage.removeItem("token");
        // }
    },
    extraReducers: (builder) => {
        const handlePending = (state) => {
            state.isLoading = true;
            state.error = null;
        };
        const handleAuthSuccess = (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = action.payload.success;
            state.user = action.payload.data || action.payload.user; // 'data' from login/reg, 'user' from checkAuth
            state.token = action.payload.token || state.token; // Use new token if provided, else keep existing
            state.error = action.payload.success ? null : (action.payload.message || "Operation failed.");
        };
        const handleError = (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            // state.user = null; // Keep user data on some errors? Depends on UX choice.
            // state.token = null; // Token might be invalid, clear it from Redux state. LocalStorage already cleared by thunks.
            state.error = action.payload?.message || "An unexpected error occurred.";
             if (action.type.includes('rejected') && !action.type.includes('checkAuth')) { // Don't clear token for failed checkAuth if it was due to no network
                 state.token = null;
             }
        };

        builder            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true; // Don't clear previous error for seamless checkAuth
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = action.payload.success;
                state.user = action.payload.user || null;
                if (action.payload.token) { // If backend sends a refreshed token
                    state.token = action.payload.token;
                } else if (!action.payload.success) {
                    state.token = null; // Explicitly nullify token if checkAuth failed
                }
                state.error = action.payload.success ? null : (action.payload.message || "Authentication check failed.");
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null; // Token is invalid or not present
                state.error = action.payload?.message || "Session is invalid or expired.";
            })
            // Logout
            .addCase(logoutUser.pending, handlePending)
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                // Even on error, ensure client state is logged out
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = action.payload?.message || "Logout encountered an issue.";
            })
            .addMatcher(
                (action) => [registerUser.pending.type, loginUser.pending.type, googleLogin.pending.type].includes(action.type),
                handlePending
            )
            .addMatcher(
                (action) => [registerUser.fulfilled.type, loginUser.fulfilled.type, googleLogin.fulfilled.type].includes(action.type),
                handleAuthSuccess
            )
            .addMatcher(
                (action) => [registerUser.rejected.type, loginUser.rejected.type, googleLogin.rejected.type].includes(action.type),
                handleError
            )
    },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;



// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
        
//         state.isLoading = false;
//         state.user = action.payload.data;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         console.log(action);

//         state.isLoading = false;
//         state.user = action.payload.success ? action.payload.data : null;
//         state.token = action.payload.token;
//         state.isAuthenticated = action.payload.success;
//       })
    
      
//       .addCase(googleLogin.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(googleLogin.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(googleLogin.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.success ? action.payload.data : null;
//         state.token = action.payload.success ? action.payload.token : null;
//         state.isAuthenticated = action.payload.success;
//       })
//       .addCase(checkAuth.rejected, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(logoutUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;