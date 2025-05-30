"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect,useRef } from "react";
import { CheckCircle, Upload, Loader, MapPin } from "lucide-react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { submitReport } from "@/redux/store/reportSlice";
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function ReportPage() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState("");
  const [wasteType, setWasteType] = useState("Verified waste type");
  const [amount, setAmount] = useState("Verified amount");
  const [verificationStatus, setVerificationStatus] = useState("idle");
  const [verificationResult, setVerificationResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [newReport, setNewReport] = useState({
    location: "",
    type: "",
    amount: "",
    address:""
  });
  const mapRef = useRef(null);
  const markerRef = useRef(null);
 

  useEffect(() => {
    if (!mapboxToken) return;
  
    mapboxgl.accessToken = mapboxToken;
  
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [78.9629, 20.5937],
      zoom: 4,
    });
   
    mapRef.current = map;
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxToken,
      countries: "IN",
      types: "country,region,place,locality,neighborhood,address,postcode,poi",
      placeholder: "Search Indian village or location",
      mapboxgl,
      marker: false,
    });
    map.addControl(geocoder);
  
  
    // When result is selected
    geocoder.on("result", (e) => {
      const name = e.result.place_name;
      const [lng, lat] = e.result.center;
  
      setNewReport((prev) => ({ ...prev, location: name }));
      setLocation(name);
  
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      }
      map.flyTo({ center: [lng, lat], zoom: 10 });
    });
  
    //  When input is cleared
    geocoder.on("clear", () => {
      setNewReport((prev) => ({ ...prev, location: "" }));
      setLocation("");
    }); 
  
    return () => {
      map.remove();
    };
  }, []);
  
  

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({ ...prev, [name]: value }));
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const verifyWaste = async () => {
    if (!file) return;

    setVerificationStatus("verifying");

    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const base64Data = await readFileAsBase64(file);
      const imageParts = [
        {
          inlineData: {
            data: base64Data,
            mimeType: file.type,
          },
        },
      ];

      const prompt = `You are an expert in waste management and recycling. Analyze this image and provide:
1. The type of waste (e.g., plastic, paper, glass, metal, organic)
2. An estimate of the quantity or amount (in kg or liters)
3. Your confidence level in this assessment (as a percentage)

Respond in JSON format like this:
{
  "wasteType": "type of waste",
  "quantity": "estimated quantity with unit",
  "confidence": confidence level as a number between 0 and 1
}`;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }, ...imageParts] }],
      });

      const output =
        result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const jsonMatch = output.match(/\{[\s\S]*?\}/);
      if (!jsonMatch) throw new Error("Invalid Gemini response format.");

      const parsed = JSON.parse(jsonMatch[0]);

      setWasteType(parsed.wasteType || "Unknown");
      setAmount(parsed.quantity || "Unknown");
      setVerificationResult(parsed);
      setNewReport((prev) => ({
        ...prev,
        type: parsed.wasteType || "Unknown",
        amount: parsed.quantity || "Unknown",
      }));
      setVerificationStatus("success");
      toast.success("Waste verified successfully");
    } catch (err) {
      console.error("Gemini verification error:", err);
      setVerificationStatus("failure");
      toast.error("Failed to verify waste");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (verificationStatus !== "success" || !user) {
      toast.error("Please verify the waste before submitting or log in.");
      console.log("Please verify the waste before submitting or log in.");
      return;
    }
    if (!file || !newReport.location || !verificationResult) {
  toast.error("Make sure image, location, and verification are all provided");
  console.log("Make sure image, location, and verification are all provided");
  
  return;
}


    setIsSubmitting(true);
    const formData= {
        userId: user._id,
        location: newReport.location || location,
        address: newReport.address || "",
        type: wasteType,
        amount: amount,
        imageUrl: preview||undefined,
        verificationResult: verificationResult|| undefined,
      }
      
      dispatch(submitReport(formData));

      toast.success("Report submitted successfully!");
      setLocation("");
      setWasteType("Verified waste type");
      setAmount("Verified amount");
      setFile(null);
      setPreview(null);
      setVerificationStatus("idle");
      setVerificationResult(null);
      setNewReport({ location: "", type: "", amount: "", address: "" });
      setIsSubmitting(false);
      navigate("/user/my-reports")
  };
return (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-3xl font-semibold mb-6 text-gray-800">Report Waste</h1>

    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg space-y-8"
    >
      {/* Upload Image */}
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Upload Waste Image
        </label>
        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <label className="cursor-pointer text-green-600 font-medium">
              Upload a file
              <input
                type="file"
                onChange={handleFileChange}
                className="sr-only"
                accept="image/*"
              />
            </label>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {preview && (
        <div>
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-96 object-contain rounded-xl"
          />
        </div>
      )}
      
      {/* Verify Waste Button */}
      <Button
        type="button"
        onClick={verifyWaste}
        disabled={!file || verificationStatus === "verifying"}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl"
      >
        {verificationStatus === "verifying" ? (
          <>
            <Loader className="animate-spin h-5 w-5 mr-3" />
            Verifying...
          </>
        ) : (
          "Verify Waste"
        )}
      </Button>

      {/* Verification Result */}
      {verificationStatus === "success" && verificationResult && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-xl">
          <h3 className="text-green-800 font-medium mb-1">Verification Result:</h3>
          <p className="text-green-700 text-sm">
            Waste Type: {verificationResult.wasteType}
            <br />
            Quantity: {verificationResult.quantity}
            <br />
            Confidence: {(verificationResult.confidence * 100).toFixed(2)}%
          </p>
        </div>
      )}

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Address (optional)
          </label>
          <input
            type="text"
            name="address"
            value={newReport.address||""}
            onChange={(e) =>
              setNewReport((prev) => ({ ...prev, address: e.target.value }))
            }
            placeholder="Enter address"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Selected Location
          </label>
          <input
            type="text"
            readOnly
            value={newReport.location}
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-xl"
          />
        </div>

         <div>
           <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
           <input
              type="text"
              id="type"
              name="type"
              value={newReport.type}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 bg-gray-100"
              placeholder="Verified waste type"
              readOnly
            />
          </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Estimated Amount
          </label>
          <input
            type="text"
            name="amount"
            value={newReport.amount}
            onChange={handleInputChange}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-xl"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Map
          </label>
          <div
            id="map-container"
            className="w-full h-64 rounded-xl border border-gray-300 shadow"
          ></div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-xl"
      >
        {isSubmitting ? (
          <>
            <Loader className="animate-spin h-5 w-5 mr-2" />
            Submitting...
          </>
        ) : (
          "Submit Report"
        )}
      </Button>
    </form>
  </div>
);

}