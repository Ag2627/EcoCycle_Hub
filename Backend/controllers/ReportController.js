import Report from "../Model/Report.js";
import dotenv from 'dotenv';
import axios from "axios";

dotenv.config();

// Controller to create a new report
export const createReport = async (req, res) => {
    try {
        const { location, type, amount, address, imageUrl, userId } = req.body;

        if (!location || !type || !amount || !imageUrl || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newReport = new Report({
            userId,
            location,
            type,
            amount,
            imageUrl,
            createdAt: new Date(),
        });

        await newReport.save();
        res.status(201).json({ message: "Report created successfully", report: newReport });

    } catch (error) {
        console.error("Error creating report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to get all reports
export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to get a report by ID
export const getReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findById(id);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json(report);
    } catch (error) {
        console.error("Error fetching report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to get reports by user ID
export const getReportByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const reports = await Report.find({ userId });
        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: "No reports found for this user" });
        }
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to delete a report by ID
export const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findByIdAndDelete(id);

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



