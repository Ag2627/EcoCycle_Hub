import express from 'express';
import { loginValidation, signupValidation } from '../Middleware/AuthValidation.js';
import { login, signup } from '../controller/AuthController.js';
const Authrouter=express.Router();

Authrouter.post('/login', loginValidation, login);
Authrouter.post('/signup', signupValidation, signup);
Authrouter.post('/check-auth',signupValidation)
export default Authrouter;