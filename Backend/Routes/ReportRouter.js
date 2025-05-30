import express from "express";
import { 
    createReport, 
    getAllReports, 
    getReportById, 
    deleteReport,
    getReportByUserId, 
    // verifyWaste 
} from "../controllers/ReportController.js";

const Reportrouter = express.Router();

// Route to create a new report
Reportrouter.post("/create", createReport);

// Route to get all reports
Reportrouter.get("/all", getAllReports);

// Route to get a specific report by ID
Reportrouter.get("/:id", getReportById);
Reportrouter.get("/user/:userId", getReportByUserId);

// Route to delete a report by ID
Reportrouter.delete("/:id", deleteReport);

// Route to verify waste using AI (e.g., Gemini AI)
// Reportrouter.post("/verify", verifyWaste);

export default Reportrouter;
