"use client"

import { useState } from "react"
import { Upload } from "lucide-react"

export default function WasteReportForm() {
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [location, setLocation] = useState("")
  const [wasteType, setWasteType] = useState("Verified waste type")
  const [amount, setAmount] = useState("Verified amount")
  const [isVerified, setIsVerified] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    setFile(file)
  }

  const verifyWaste = () => {
    // Simulate verification process
    setIsVerified(true)
  }

  const submitReport = () => {
    // Handle form submission
    alert("Report submitted successfully!")
    // Reset form
    setFile(null)
    setLocation("")
    setIsVerified(false)
  }

  return (
    <div className="flex flex-col max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <div
        className={`border-2 border-dashed ${dragActive ? "border-green-500" : "border-green-300"} rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px] ${dragActive ? "bg-green-50" : "bg-white"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label htmlFor="file-upload" className="cursor-pointer w-full text-center">
          <div className="flex flex-col items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-green-500 font-medium text-lg">Upload a file or drag and drop</p>
            <p className="text-gray-500 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".png,.jpg,.jpeg,.gif"
              onChange={handleFileChange}
            />
          </div>
        </label>
        {file && <div className="mt-2 text-sm text-gray-600">File selected: {file.name}</div>}
      </div>

      <button
        className="mt-6 w-full bg-blue-400 hover:bg-blue-500 text-white py-3 px-4 rounded-lg font-medium"
        onClick={verifyWaste}
      >
        Verify Waste
      </button>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter waste location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Waste Type</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none"
            value={wasteType}
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Estimated Amount</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none"
            value={amount}
            disabled
          />
        </div>
      </div>

      <button
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium"
        onClick={submitReport}
      >
        Submit Report
      </button>
    </div>
  )
}

