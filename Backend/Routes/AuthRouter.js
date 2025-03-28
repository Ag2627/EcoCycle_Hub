import express from 'express';
import { loginValidation, signupValidation } from '../Middleware/AuthValidation.js';
import { googleLogin, login, signup } from '../controllers/AuthController.js';
const Authrouter=express.Router();

Authrouter.post('/login', loginValidation, login);
Authrouter.post('/signup', signupValidation, signup);
Authrouter.post('/check-auth',signupValidation)
Authrouter.post('/google-login',googleLogin)
export default Authrouter;