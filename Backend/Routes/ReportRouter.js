import express from "express";
import { 
    createReport, 
    getAllReports, 
    getReportById, 
    deleteReport, 
    verifyWaste 
} from "../controller/ReportController.js";

const Reportrouter = express.Router();

// Route to create a new report
Reportrouter.post("/create", createReport);

// Route to get all reports
Reportrouter.get("/all", getAllReports);

// Route to get a specific report by ID
Reportrouter.get("/:id", getReportById);

// Route to delete a report by ID
Reportrouter.delete("/:id", deleteReport);

// Route to verify waste using AI (e.g., Gemini AI)
Reportrouter.post("/verify", verifyWaste);

export default Reportrouter;
