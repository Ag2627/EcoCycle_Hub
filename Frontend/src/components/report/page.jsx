"use client";

import React, { useState, useRef, useCallback } from "react";
import { Map } from "@maptiler/sdk";
//import { GeocodingControl } from "@maptiler/geocoding-control";
import "@maptiler/sdk/dist/maptiler-sdk.css";
//import "@maptiler/geocoding-control/style.css";

import { Upload, CheckCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const mapTilerApiKey = import.meta.env.VITE_MAPTILER_API_KEY; // Your MapTiler API key

export default function ReportPage() {
  const [newReport, setNewReport] = useState({
    location: "",
    type: "",
    amount: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mapRef = useRef(null);

  // Handle File Upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle Location Search
  const handleLocationSelect = useCallback((query) => {
    setNewReport((prev) => ({
      ...prev,
      location: query,
    }));
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.loading("Submitting report...");

    try {
      const formData = new FormData();
      formData.append("location", newReport.location);
      formData.append("type", newReport.type);
      formData.append("amount", newReport.amount);
      if (file) formData.append("file", file);

      const response = await fetch("/api/report", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Report submitted successfully!");
        setNewReport({ location: "", type: "", amount: "" });
        setFile(null);
        setPreview(null);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast.error("Error submitting report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Report Waste</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg mb-12">
        {/* Image Upload */}
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">Upload Waste Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                  <span>Upload a file</span>
                  <input type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mt-4 mb-8">
            <img src={preview} alt="Waste preview" className="max-w-full h-auto rounded-xl shadow-md" />
          </div>
        )}

        {/* Location Search using MapTiler */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-green-500"
            placeholder="Enter waste location"
            onChange={(e) => handleLocationSelect(e.target.value)}
          />
        </div>

        {/* MapTiler Map */}
        <div className="mb-8">
          <Map
            ref={mapRef}
            style={{ width: "100%", height: "300px" }}
            center={[0, 0]}
            zoom={2}
            apiKey={mapTilerApiKey}
          />
        </div>

        {/* Waste Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Type of Waste</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            placeholder="E.g. Plastic, Glass, Paper"
            value={newReport.type}
            onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
          />
        </div>

        {/* Waste Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Approximate Amount (Kg)</label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            placeholder="Enter amount in Kg"
            value={newReport.amount}
            onChange={(e) => setNewReport({ ...newReport, amount: e.target.value })}
          />
        </div>

        {/* Verification Status */}
        {verificationStatus === "loading" && (
          <div className="flex items-center space-x-2 mb-4 text-blue-500">
            <Loader className="animate-spin h-5 w-5" />
            <span>Verifying image...</span>
          </div>
        )}
        {verificationStatus === "verified" && (
          <div className="flex items-center space-x-2 mb-4 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span>Verified!</span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </Button>
      </form>
    </div>
  );
}
