import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Connection from "./Database/db.js"
import bodyParser from "body-parser"
import Authrouter from "./Routes/AuthRouter.js";
import Reportrouter from "./Routes/ReportRouter.js";
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use( cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })); //iske andar ye likhna optional h likh kar bas site secure banti h or nahi likhne par kisi par bhi chal jaati h

//   app.use(bodyParser.json({extended:true}));
// app.use(bodyParser.urlencoded({extended:true}));
app.use('/auth',Authrouter);
// Routes
app.get("/", (req, res) => {
  res.send("Waste Management API is running...");
});
app.use("/reports", Reportrouter);
// MongoDB Connection
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
