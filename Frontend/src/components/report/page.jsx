// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Button } from "../ui/button";
// import { useState,useCallback,useEffect } from "react";
// import { MapPin,Upload,CheckCircle,Loader } from "lucide-react";
// import { StandaloneSearchBox,useJsApiLoader } from "@react-google-maps/api";
// import { Libraries } from "@react-google-maps/api";
// import {toast} from 'react-hot-toast';
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Upload } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const ReportPage = () => {
  const [location, setLocation] = useState(defaultCenter);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleMapClick = (e) => {
    setLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    console.log("Report submitted", { location, description, image });
    alert("Report submitted successfully!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Report Waste Issue</h1>
      <Card>
        <CardContent className="p-4 space-y-4">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={15}
              onClick={handleMapClick}
            >
              <Marker position={location} />
            </GoogleMap>
          </LoadScript>

          <Textarea
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="flex items-center gap-2 cursor-pointer">
            <Upload />
            <span>Upload Image</span>
            <Input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
          {image && <img src={image} alt="Uploaded" className="w-full h-40 object-cover rounded-lg" />}

          <Button onClick={handleSubmit} className="w-full bg-blue-500 hover:bg-blue-700">
            Submit Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportPage;

