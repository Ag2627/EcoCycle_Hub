// import { useState } from "react";
// import { Map, Search, MapPin, Phone, Clock, Filter, ExternalLink } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxgl from 'mapbox-gl';
// import { useRef,useEffect } from "react";
// import { 
//   Select, 
//   SelectTrigger, 
//   SelectValue, 
//   SelectContent, 
//   SelectItem 
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
// // Mock recycling centers data
// mapboxgl.accessToken = mapboxToken;
// const centers = [
//   {
//     id: 1,
//     name: "GreenCycle Facility",
//     address: "123 Recycling Ave, Green City",
//     phone: "(555) 123-4567",
//     hours: "Mon-Sat: 8AM-6PM, Sun: Closed",
//     distance: 1.2,
//     accepts: ["plastic", "paper", "glass", "metal", "electronics"],
//     coordinates: { lat: 34.0522, lng: -118.2437 }
//   },
//   {
//     id: 2,
//     name: "EcoWaste Solutions",
//     address: "456 Environment Blvd, Green City",
//     phone: "(555) 987-6543",
//     hours: "Mon-Fri: 7AM-7PM, Sat-Sun: 9AM-5PM",
//     distance: 2.5,
//     accepts: ["plastic", "paper", "glass", "metal", "hazardous", "batteries"],
//     coordinates: { lat: 34.0522, lng: -118.2437 }
//   },
//   {
//     id: 3,
//     name: "Community Recycling Hub",
//     address: "789 Community Rd, Green City",
//     phone: "(555) 456-7890",
//     hours: "Mon-Sun: 24 hours (Dropoff)",
//     distance: 3.7,
//     accepts: ["plastic", "paper", "glass", "metal"],
//     coordinates: { lat: 34.0522, lng: -118.2437 }
//   },
//   {
//     id: 4,
//     name: "E-Waste Specialists",
//     address: "101 Tech Lane, Green City",
//     phone: "(555) 234-5678",
//     hours: "Tue-Sat: 10AM-6PM, Sun-Mon: Closed",
//     distance: 4.1,
//     accepts: ["electronics", "batteries", "appliances"],
//     coordinates: { lat: 34.0522, lng: -118.2437 }
//   },
//   {
//     id: 5,
//     name: "Zero Waste Center",
//     address: "202 Sustainability St, Green City",
//     phone: "(555) 876-5432",
//     hours: "Mon-Sat: 8AM-8PM, Sun: 10AM-4PM",
//     distance: 5.3,
//     accepts: ["plastic", "paper", "glass", "metal", "organic", "textiles"],
//     coordinates: { lat: 34.0522, lng: -118.2437 }
//   }
// ];

// // List of waste types and their labels
// const wasteTypes = [
//   { value: "plastic", label: "Plastic" },
//   { value: "paper", label: "Paper" },
//   { value: "glass", label: "Glass" },
//   { value: "metal", label: "Metal" },
//   { value: "electronics", label: "Electronics" },
//   { value: "batteries", label: "Batteries" },
//   { value: "hazardous", label: "Hazardous Waste" },
//   { value: "organic", label: "Organic/Compost" },
//   { value: "textiles", label: "Textiles/Clothing" },
//   { value: "appliances", label: "Appliances" }
// ];

// const RecyclingCenters = () => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedWasteType, setSelectedWasteType] = useState("");
//     const [maxDistance, setMaxDistance] = useState("10");
//     const [openOnly, setOpenOnly] = useState(false);
//     const [filtered, setFiltered] = useState(centers);
//     const [showFilters, setShowFilters] = useState(false);
   
//     const [currentCoords, setCurrentCoords] = useState(null); // Store user's coordinates
//     const [mapMarkers, setMapMarkers] = useState([]);         // Store filtered markers
//     const mapRef = useRef(null);                              // Reference to the map
//     const mapContainerRef = useRef(null);                     // DOM container for Mapbox
//     useEffect(() => {
//         handleGetCurrentLocation();
//     }, []);

//     useEffect(() => {
//       if (!mapContainerRef.current || mapRef.current) return;
    
//       mapRef.current = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: [78.9629, 20.5937], // Centered on India
//         zoom: 4, // Suitable zoom level for a country view
//       });
      
//     }, []);
    
//     function haversineDistance([lat1, lon1], [lat2, lon2]) {
//       const R = 6371; // Earth radius in km
//       const dLat = (lat2 - lat1) * Math.PI / 180;
//       const dLon = (lon2 - lon1) * Math.PI / 180;
    
//       const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(lat1 * Math.PI / 180) *
//         Math.cos(lat2 * Math.PI / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
    
//       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//       return R * c;
//     }
//     // useEffect(() => {
//     //   handleGetCurrentLocation();
//     // }, []);
//     // const handleGetCurrentLocation = () => {
//     //   console.log("🔍 Requesting current location...");
//     //   toast.info("Getting your current location...");
    
//     //   if (!navigator.geolocation) {
//     //     toast.error("Geolocation not supported by your browser.");
//     //     return;
//     //   }
    
//     //   navigator.geolocation.getCurrentPosition(
//     //     (position) => {
//     //       const { latitude, longitude } = position.coords;
//     //       console.log("✅ Location obtained:", latitude, longitude);
//     //       toast.success("Location updated!");
    
//     //       const coords = { lat: latitude, lng: longitude };
//     //       setCurrentCoords(coords);
//     //       setSearchTerm("Current Location");
    
//     //       if (mapRef.current) {
//     //         mapRef.current.flyTo({
//     //           center: [longitude, latitude],
//     //           zoom: 14,
//     //           speed: 1.5,
//     //         });
//     //       }
    
//     //       setTimeout(() => {
//     //         handleSearch();
//     //       }, 200);
//     //     },
//     //     (error) => {
//     //       console.error("❌ Geolocation error:", error);
    
//     //       if (error.code === 1) {
//     //         toast.error("Permission denied for location.");
//     //       } else if (error.code === 2) {
//     //         toast.error("Location unavailable.");
//     //       } else if (error.code === 3) {
//     //         toast.error("Location request timed out. Using fallback (Delhi).");
//     //       } else {
//     //         toast.error("Unknown location error.");
//     //       }
    
//     //       // Use fallback
//     //       const fallback = { lat: 28.6139, lng: 77.2090 };
//     //       setCurrentCoords(fallback);
//     //       setSearchTerm("Delhi");
    
//     //       if (mapRef.current) {
//     //         mapRef.current.flyTo({
//     //           center: [fallback.lng, fallback.lat],
//     //           zoom: 12,
//     //           speed: 1.5,
//     //         });
//     //       }
    
//     //       setTimeout(() => {
//     //         handleSearch();
//     //       }, 200);
//     //     },
//     //     {
//     //       enableHighAccuracy: true,
//     //       timeout: 20000, // ⬅️ Increased timeout to 20 seconds
//     //       maximumAge: 0,
//     //     }
//     //   );
//     // };
//     const handleGetCurrentLocation = () => {
//   console.log("🔍 Requesting current location...");
//   toast.info("Getting your current location...");

//   if (!navigator.geolocation) {
//     toast.error("Geolocation not supported by your browser.");
//     return;
//   }

//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
//       console.log("✅ Location obtained:", latitude, longitude);
//       toast.success("Location updated!");

//       const coords = { lat: latitude, lng: longitude };
//       setCurrentCoords(coords);
//       setSearchTerm("Current Location");

//       if (mapRef.current) {
//         mapRef.current.flyTo({
//           center: [longitude, latitude],
//           zoom: 14,
//           speed: 1.5,
//         });
//       }

//       setTimeout(() => {
//         handleSearch();
//       }, 200);
//     },
//     (error) => {
//       console.error("❌ Geolocation error:", error);
//       handleGeolocationError(error);
//     },
//     {
//       enableHighAccuracy: true,
//       timeout: 20000,
//       maximumAge: 0,
//     }
//   );
// };

// const handleGeolocationError = (error) => {
//   switch (error.code) {
//     case error.PERMISSION_DENIED:
//       toast.error("Permission denied for location.");
//       break;
//     case error.POSITION_UNAVAILABLE:
//       toast.error("Location unavailable.");
//       break;
//     case error.TIMEOUT:
//       toast.error("Location request timed out. Using fallback (Delhi).");
//       break;
//     case error.UNKNOWN_ERROR:
//       toast.error("Unknown location error.");
//       break;
//   }

//   // Use fallback
//   const fallback = { lat: 28.6139, lng: 77.2090 }; // Delhi coordinates
//   setCurrentCoords(fallback);
//   setSearchTerm("Delhi");

//   if (mapRef.current) {
//     mapRef.current.flyTo({
//       center: [fallback.lng, fallback.lat],
//       zoom: 12,
//       speed: 1.5,
//     });
//   }

//   setTimeout(() => {
//     handleSearch();
//   }, 200);
// };
//     const fetchNearbyNGOs = async (lat, lng) => {
//   const query = `https://nominatim.openstreetmap.org/search.php?q=ngo+near+${lat},${lng}&format=jsonv2`;

//   try {
//     const response = await fetch(query);
//     const data = await response.json();

//     const formatted = data.map((item, idx) => ({
//       id: idx,
//       name: item.display_name,
//       coordinates: {
//         lat: parseFloat(item.lat),
//         lng: parseFloat(item.lon),
//       },
//       address: item.display_name,
//       accepts: ["general aid"], // you can customize
//       hours: "Unknown",
//       phone: "N/A",
//     }));

//     setFiltered(formatted);
//     toast.success(`Found ${formatted.length} NGOs near you`);
//   } catch (err) {
//     console.error("Failed to fetch NGOs", err);
//     toast.error("Failed to fetch NGOs near you");
//   }
// };

    
    
//     console.log("Current Coords:", currentCoords);
//     const handleSearch = () => {
//       if (!currentCoords) {
//         toast.error("Please enable location access first.");
//         return;
//       }
    
//       const userLat = currentCoords.lat;
//       const userLng = currentCoords.lng;
    
//       // 1. Filter by name or address
//       let results = centers.filter((center) =>
//         center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         center.address.toLowerCase().includes(searchTerm.toLowerCase())
//       );
      
//       // 2. Filter by selected waste type
//       if (selectedWasteType) {
//         results = results.filter((center) =>
//           center.accepts.includes(selectedWasteType)
//         );
//       }
    
//       // 3. Compute and filter by distance
//       results = results
//         .map((center) => {
//           if (!center.coordinates || !center.coordinates.lat || !center.coordinates.lng) return false;
//           const distance = haversineDistance(
//             [userLat, userLng],
//             [center.coordinates.lat, center.coordinates.lng]
//           );
//           return { ...center, distance };
//         })
//         .filter((center) => center.distance <= parseInt(maxDistance));
    
//       // 4. Filter by open/closed
//       if (openOnly) {
//         results = results.filter((center) =>
//           !center.hours.toLowerCase().includes("closed")
//         );
//       }
    
//       // 5. Update filtered list
//       setFiltered(results);
      

//       // 6. Update map markers (GeoJSON)
//       const geojsonMarkers = results.map((center) => ({
        
//         type: "Feature",
//         geometry: {
//           type: "Point",
//           coordinates: [center.coordinates.lng, center.coordinates.lat], // FIXED here
//         },
//         properties: {
//           title: center.name,
//           description: `${center.address} (${center.distance.toFixed(2)} km)`,
//         },
//       }));
    
//       setMapMarkers(geojsonMarkers);
    
//       // 7. Notifications
//       if (results.length === 0) {
//         toast.info("No recycling centers found matching your criteria.");
//       } else {
//         toast.success(`Found ${results.length} recycling centers.`);
//       }
//     };
    
//     useEffect(() => {
//       if (!mapRef.current || !mapMarkers.length) return;
    
//       document.querySelectorAll('.custom-marker').forEach(el => el.remove());
    
//       mapMarkers.forEach((marker) => {
//         new mapboxgl.Marker({ className: 'custom-marker' })
//           .setLngLat(marker.geometry.coordinates)
//           .setPopup(
//             new mapboxgl.Popup({ offset: 25 })
//               .setHTML(`<h3>${marker.properties.title}</h3><p>${marker.properties.description}</p>`)
//           )
//           .addTo(mapRef.current);
//       });
//     }, [mapMarkers]);
     
//     useEffect(() => {
//   if (currentCoords) {
//     fetchNearbyNGOs(currentCoords.lat, currentCoords.lng);
//   }
// }, [currentCoords]);
    
//     console.log("Search Term:", searchTerm);
//     console.log("Centers Available:", centers);
    
      

//   return (
    
//     <div className="min-h-screen flex flex-col">
//       {/* <Navbar /> */}
//       <main className="flex-grow pt-24 pb-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-10">
//           <h1
//             className="text-3xl font-bold mb-4 text-transparent bg-clip-text"
//             style={{
//             backgroundImage: 'linear-gradient(to right, #15803d, #0369a1)', // eco-700 green to water-700 blue
//             }}
//             >
//             Find Recycling Centers
//         </h1>

//             <p className="text-foreground/70 max-w-2xl mx-auto">
//               Locate recycling and waste disposal facilities near you. Filter by type of waste
//               and get directions to the nearest centers.
//             </p>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
//             <div className="flex flex-col md:flex-row md:items-end gap-4">
//               <div className="flex-grow space-y-2">
//                 <Label htmlFor="location">Location</Label>
//                 <div className="flex">
//                   <Input
//                     id="location"
//                     placeholder="Enter address or city"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="flex-grow"
//                   />
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="ml-2 flex-shrink-0"
//                     onClick={handleGetCurrentLocation}
//                   >
//                     <MapPin size={18} className="mr-2" />
//                     <span className="hidden sm:inline">Use Current</span>
//                   </Button>
//                 </div>
//               </div>
              
//               <div className="w-full md:w-auto flex-shrink-0">
//                 <Button onClick={() => fetchNearbyNGOs(currentCoords.lat, currentCoords.lng)}>
//   Find Nearby NGOs
// </Button>

//                 <Button 
//                   onClick={handleSearch}
//                   className="w-full md:w-auto h-10"
//                 >
//                   <Search size={18} className="mr-2" />
//                   Search
//                 </Button>
//               </div>
              
//               <div className="w-full md:w-auto flex-shrink-0">
//                 <Button 
//                   variant="outline"
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="w-full md:w-auto h-10"
//                 >
//                   <Filter size={18} className="mr-2" />
//                   Filters
//                 </Button>
//               </div>
//             </div>
            
//             {showFilters && (
//               <div className="mt-6 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="waste-type">Type of Waste</Label>
//                   <Select
//                     value={selectedWasteType}
//                     onValueChange={setSelectedWasteType}
//                   >
//                     <SelectTrigger id="waste-type">
//                       <SelectValue placeholder="All waste types" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="">All waste types</SelectItem>
//                       {wasteTypes.map(type => (
//                         <SelectItem key={type.value} value={type.value}>
//                           {type.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="distance">Maximum Distance</Label>
//                   <Select
//                     value={maxDistance}
//                     onValueChange={setMaxDistance}
//                   >
//                     <SelectTrigger id="distance">
//                       <SelectValue placeholder="Select distance" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="5">Within 5 miles</SelectItem>
//                       <SelectItem value="10">Within 10 miles</SelectItem>
//                       <SelectItem value="25">Within 25 miles</SelectItem>
//                       <SelectItem value="50">Within 50 miles</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
                
//                 <div className="flex items-center space-x-2 md:mt-8">
//                   <Checkbox 
//                     id="open-now" 
//                     checked={openOnly}
//                     onCheckedChange={(checked) => 
//                       setOpenOnly(checked === true)
//                     }
//                   />
//                   <Label htmlFor="open-now" className="cursor-pointer">
//                     Show open centers only
//                   </Label>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-1 order-2 lg:order-1 space-y-6">
//               {filtered.map((center) => (
//                 <div
//                 key={center.id}
//                 className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-green-300 hover:shadow-md transition-all duration-300"
//               >
              
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold mb-1">{center.name}</h3>
//                     <div className="text-sm text-foreground/70 mb-3">
//                       {center.distance} miles away
//                     </div>
                    
//                     <div className="space-y-2 mb-4">
//                       <div className="flex items-start">
//                       <MapPin size={16} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />

//                         <span>{center.address}</span>
//                       </div>
//                       <div className="flex items-start">
//                       <Phone size={16} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />

//                         <span>{center.phone}</span>
//                       </div>
//                       <div className="flex items-start">
//                       <Clock size={16} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />

//                         <span>{center.hours}</span>
//                       </div>
//                     </div>
                    
//                     <div className="mb-4">
//                       <div className="text-sm font-medium mb-2">Accepts:</div>
//                       <div className="flex flex-wrap gap-2">
//                         {center.accepts.map((type) => {
//                           const wasteType = wasteTypes.find(w => w.value === type);
//                           return (
//                             <span
//   key={type}
//   className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
// >

//                               {wasteType?.label || type}
//                             </span>
//                           );
//                         })}
//                       </div>
//                     </div>
                    
//                     <div className="flex space-x-3">
//                       {/* <Button className="flex-1">
//                         Get Directions
//                       </Button> */}
//                       {/* <Button variant="outline" size="icon">
//                         <Phone size={16} />
//                       </Button> */}
//                     </div>
//                   </div>
//                 </div>
//               ))}
              
//               {filtered.length === 0 && (
//                 <div className="text-center p-8 bg-gray-50 rounded-lg">
//                   <div className="text-4xl mb-4">🔍</div>
//                   <h3 className="text-lg font-medium mb-2">No centers found</h3>
//                   <p className="text-foreground/70 mb-4">
//                     Try adjusting your search criteria or expanding your search radius.
//                   </p>
//                   <Button onClick={() => {
//                     setSearchTerm("");
//                     setSelectedWasteType("");
//                     setMaxDistance("10");
//                     setOpenOnly(false);
//                     setFiltered(centers);
//                   }}>
//                     Reset Filters
//                   </Button>
//                 </div>
//               )}
//             </div>
            
//             <div className="lg:col-span-2 order-1 lg:order-2">
//               <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-200 overflow-hidden h-[500px] relative">
//                 {/* <div className="absolute inset-0 flex items-center justify-center bg-gray-200"> */}
//                 <div ref={mapContainerRef} className="absolute inset-0 z-0" >

//                   <div className="text-center p-6">
//                     <Map size={48} className="mx-auto text-gray-400 mb-4" />
//                     <h3 className="text-lg font-medium mb-2">Interactive Map</h3>
//                     <p className="text-foreground/70 mb-4">
//                       In a real application, this would display an interactive map
//                       showing all recycling centers in your area.
//                     </p>
//                     <Button>
//                       <MapPin size={18} className="mr-2" />
//                       Show My Location
//                     </Button>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-eco-50 rounded-xl p-6 mt-6">
//                 <h2 className="text-xl font-semibold mb-4">Recycling Center Tips</h2>
//                 <ul className="space-y-3">
//                   <li className="flex items-start gap-2">
//                   <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">
//   1
// </div>

//                     <span>Call ahead to confirm operating hours and accepted materials</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                   <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">
//   2
// </div>

//                     <span>Sort your recyclables by type before arriving</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                   <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">
//   3
// </div>

//                     <span>Remove caps, rinse containers, and flatten cardboard boxes</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                   <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">
//   4
// </div>

//                     <span>Some centers offer payment for certain recyclable materials</span>
//                   </li>
//                 </ul>
                
//                 <Button className="mt-6 w-full" variant="outline" asChild>
//                   <a href="https://earth911.com/recycling-guide/" target="_blank" rel="noopener noreferrer">
//                     <ExternalLink size={16} className="mr-2" />
//                     Complete Recycling Guide
//                   </a>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default RecyclingCenters;

// import React, { useEffect, useRef, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import { Select, SelectTrigger,
//   SelectValue, SelectContent, SelectItem
// } from '@/components/ui/select';
// import { Button } from '../ui/button';
// import { Checkbox } from '../ui/checkbox';
// import { Input } from '../ui/input';
// import { Label } from '../ui/label';
// import { MapPin, Search, Filter, Clock, Phone, Map, ExternalLink } from 'lucide-react';
// import { toast } from 'sonner';

// const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
// mapboxgl.accessToken = mapboxToken;
//  const centers = [
//   {
//     id: 1,
//     name: "GreenCycle Facility",
//     address: "123 Recycling Ave, Green City",
//     phone: "(555) 123-4567",
//     hours: "Mon-Sat: 8AM-6PM, Sun: Closed",
//     distance: 1.2,
//     accepts: ["plastic", "paper", "glass", "metal", "electronics"],
//     coordinates: { lat: 34.0522, lng: -118.2437 }
//   },
//   {
//     id: 2,
//     name: "EcoWaste Solutions",
//     address: "456 Environment Blvd, Green City",
//     phone: "(555) 987-6543",
//     hours: "Mon-Fri: 7AM-7PM, Sat-Sun: 9AM-5PM",
//     distance: 2.5,
//     accepts: ["plastic", "paper", "glass", "metal", "hazardous", "batteries"],
//     coordinates: { lat: 34.0522, lng: -118.2437 }
//   },
//   {
//     id: 3,
//     name: "Community Recycling Hub",
//     address: "789 Community Rd, Green City",
//     phone: "(555) 456-7890",
//     hours: "Mon-Sun: 24 hours (Dropoff)",
//     distance: 3.7,
//     accepts: ["plastic", "paper", "glass", "metal"],
//     coordinates: { lat: 34.0522, lng: -118.2437 }
//   },
//   {
//     id: 4,
//     name: "E-Waste Specialists",
//     address: "101 Tech Lane, Green City",
//     phone: "(555) 234-5678",
//     hours: "Tue-Sat: 10AM-6PM, Sun-Mon: Closed",
//     distance: 4.1,
//     accepts: ["electronics", "batteries", "appliances"],
//     coordinates: { lat: 34.0522, lng: -118.2437 }
//   },
//   {
//     id: 5,
//     name: "Zero Waste Center",
//     address: "202 Sustainability St, Green City",
//     phone: "(555) 876-5432",
//     hours: "Mon-Sat: 8AM-8PM, Sun: 10AM-4PM",
//     distance: 5.3,
//     accepts: ["plastic", "paper", "glass", "metal", "organic", "textiles"],
//     coordinates: { lat: 34.0522, lng: -118.2437 }
//   }
// ];

// // List of waste types and their labels
// const wasteTypes = [
//   { value: "plastic", label: "Plastic" },
//   { value: "paper", label: "Paper" },
//   { value: "glass", label: "Glass" },
//   { value: "metal", label: "Metal" },
//   { value: "electronics", label: "Electronics" },
//   { value: "batteries", label: "Batteries" },
//   { value: "hazardous", label: "Hazardous Waste" },
//   { value: "organic", label: "Organic/Compost" },
//   { value: "textiles", label: "Textiles/Clothing" },
//   { value: "appliances", label: "Appliances" }
// ];


// const RecyclingCenters = () => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [userCoords, setUserCoords] = useState(null);
//   const [centers, setCenters] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [selectedWasteType, setSelectedWasteType] = useState('');
//   const [maxDistance, setMaxDistance] = useState('10');
//   const [openOnly, setOpenOnly] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);

//   const initializeMap = (center = [77.209, 28.613]) => {
//   if (mapRef.current) return;

//   mapRef.current = new mapboxgl.Map({
//     container: mapContainerRef.current,
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: center,
//     zoom: 10,
//   });

//   // Add navigation controls
//   mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

//   // Add geocoder control
//   const geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl,
//     marker: false,
//   });

//   mapRef.current.addControl(geocoder);
// };
// const addMarkers = () => {
//   if (!mapRef.current || !filtered.length) return;

//   // Clear previous markers if needed
//   const markers = document.getElementsByClassName('mapboxgl-marker');
//   while (markers.length > 0) {
//     markers[0].remove();
//   }

//   filtered.forEach(center => {
//     const el = document.createElement('div');
//     el.className = 'marker';
//     el.style.width = '24px';
//     el.style.height = '24px';
//     el.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/684/684908.png')";
//     el.style.backgroundSize = 'cover';
//     el.style.borderRadius = '50%';
//     el.style.cursor = 'pointer';

//     const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
//       <h3>${center.name}</h3>
//       <p>${center.address}</p>
//     `);

//     new mapboxgl.Marker(el)
//       .setLngLat([center.coordinates.lng, center.coordinates.lat])
//       .setPopup(popup)
//       .addTo(mapRef.current);
//   });
// };

  

//   const handleGetCurrentLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const lat = pos.coords.latitude;
//         const lng = pos.coords.longitude;
//         setUserCoords({ lat, lng });
//         mapRef.current.flyTo({ center: [lng, lat], zoom: 13 });
//         fetchNearbyRecyclingCenters(lat, lng);
//       },
//       () => alert('Unable to get current location')
//     );
//   };
//   const fetchNearbyRecyclingCenters = async (lat, lng) => {
//   const query = `https://nominatim.openstreetmap.org/search.php?q=ngo+near+${lat},${lng}&format=jsonv2`;

//   try {
//     const response = await fetch(query);
//     const data = await response.json();

//     const formatted = data.map((item, idx) => ({
//       id: idx,
//       name: item.display_name,
//       coordinates: {
//         lat: parseFloat(item.lat),
//         lng: parseFloat(item.lon),
//       },
//       address: item.display_name,
//       accepts: ["general aid"], // you can customize
//       hours: "Unknown",
//       phone: "N/A",
//     }));
//     console.log("lat",lat);
//     console.log("lan",lan);
//     setFiltered(formatted);
//     toast.success(`Found ${formatted.length} NGOs near you`);
//   } catch (err) {
//     console.error("Failed to fetch NGOs", err);
//     toast.error("Failed to fetch NGOs near you");
//   }
// };

//   const handleSearch = () => {
//     console.log("userCoords",userCoords)
//     if (userCoords) fetchNearbyRecyclingCenters(userCoords.lat, userCoords.lng);
//   };

//   useEffect(() => {
//     initializeMap([77.209, 28.613]); // Delhi default
//   }, []);

//   useEffect(() => {
//     addMarkers();
//   }, [filtered]);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-grow pt-24 pb-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-10">
//             <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text"
//                 style={{ backgroundImage: 'linear-gradient(to right, #15803d, #0369a1)' }}>
//               Find Recycling Centers
//             </h1>
//             <p className="text-foreground/70 max-w-2xl mx-auto">
//               Locate recycling and waste disposal facilities near you.
//             </p>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
//             <div className="flex flex-col md:flex-row md:items-end gap-4">
//               <div className="flex-grow space-y-2">
//                 <Label htmlFor="location">Location</Label>
//                 <div className="flex">
//                   <Input
//                     id="location"
//                     placeholder="Enter address or city"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="flex-grow"
//                   />
//                   <Button type="button" variant="outline" className="ml-2 flex-shrink-0"
//                           onClick={handleGetCurrentLocation}>
//                     <MapPin size={18} className="mr-2" />
//                     <span className="hidden sm:inline">Use Current</span>
//                   </Button>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <Button onClick={handleSearch} className="h-10">
//                   <Search size={18} className="mr-2" />
//                   Search
//                 </Button>
//                 <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-10">
//                   <Filter size={18} className="mr-2" />
//                   Filters
//                 </Button>
//               </div>
//             </div>

//             {showFilters && (
//               <div className="mt-6 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="waste-type">Type of Waste</Label>
//                   <Select value={selectedWasteType} onValueChange={setSelectedWasteType}>
//                     <SelectTrigger id="waste-type">
//                       <SelectValue placeholder="All waste types" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="">All waste types</SelectItem>
//                       {wasteTypes.map(type => (
//                         <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="distance">Maximum Distance</Label>
//                   <Select value={maxDistance} onValueChange={setMaxDistance}>
//                     <SelectTrigger id="distance">
//                       <SelectValue placeholder="Select distance" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="5">Within 5 miles</SelectItem>
//                       <SelectItem value="10">Within 10 miles</SelectItem>
//                       <SelectItem value="25">Within 25 miles</SelectItem>
//                       <SelectItem value="50">Within 50 miles</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="flex items-center space-x-2 md:mt-8">
//                   <Checkbox id="open-now" checked={openOnly} onCheckedChange={setOpenOnly} />
//                   <Label htmlFor="open-now" className="cursor-pointer">Show open centers only</Label>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-1 order-2 lg:order-1 space-y-6">
//               {filtered.length ? filtered.map((center) => (
//                 <div key={center._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
//                   <h3 className="text-lg font-semibold mb-1">{center.name}</h3>
//                   <div className="text-sm text-foreground/70 mb-3">{center.distance || 'Nearby'}</div>
//                   <div className="text-sm text-foreground/70 mb-1">{center.address}</div>
//                   <div className="text-sm text-foreground/70 mb-1">{center.phone}</div>
//                   <div className="text-sm text-foreground/70 mb-2">{center.hours}</div>
//                   <div className="flex flex-wrap gap-2">
//                     {center.accepts?.map((type) => (
//                       <span key={type} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
//                         {wasteTypes.find(w => w.value === type)?.label || type}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )) : (
//                 <div className="text-center p-8 bg-gray-50 rounded-lg">
//                   <div className="text-4xl mb-4">🔍</div>
//                   <h3 className="text-lg font-medium mb-2">No centers found</h3>
//                   <Button onClick={() => setFiltered(centers)}>Reset Filters</Button>
//                 </div>
//               )}
//             </div>

//             <div className="lg:col-span-2 order-1 lg:order-2">
//               <div className="bg-gray-100 rounded-xl overflow-hidden h-[500px] relative">
//               <div
//   ref={mapContainerRef}
//   className="absolute inset-0 z-0"
//   style={{ height: "100%", minHeight: "500px" }}
// />

//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

//export default RecyclingCenters;











import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Select, SelectTrigger,
  SelectValue, SelectContent, SelectItem
} from '@/components/ui/select';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { MapPin, Search, Filter, Clock, Phone, Map, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;
 

// List of waste types and their labels
const wasteTypes = [
  { value: "plastic", label: "Plastic" },
  { value: "paper", label: "Paper" },
  { value: "glass", label: "Glass" },
  { value: "metal", label: "Metal" },
  { value: "electronics", label: "Electronics" },
  { value: "batteries", label: "Batteries" },
  { value: "hazardous", label: "Hazardous Waste" },
  { value: "organic", label: "Organic/Compost" },
  { value: "textiles", label: "Textiles/Clothing" },
  { value: "appliances", label: "Appliances" }
];


const RecyclingCenters = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [userCoords, setUserCoords] = useState(null);
  const [centers, setCenters] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedWasteType, setSelectedWasteType] = useState('');
  const [maxDistance, setMaxDistance] = useState('10');
  const [openOnly, setOpenOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  

  useEffect(() => {
  const fetchCentersFromBackend = async () => {
    try {
      // ✅ Correct
const response = await fetch("http://localhost:5000/ngos");


      const data = await response.json();
      setCenters(data);
      setFiltered(data); // Set filtered initially to full list
    } catch (err) {
      console.error("Error fetching centers from backend:", err);
    }
  };

  fetchCentersFromBackend();
  initializeMap([77.209, 28.613]);
}, []);

  const initializeMap = (center = [77.209, 28.613]) => {
  if (mapRef.current) return;

  mapRef.current = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 10,
  });

  // Add navigation controls
  mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

  // Add geocoder control
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false,
  });

  mapRef.current.addControl(geocoder);
};
const addMarkers = () => {
  if (!mapRef.current || !filtered.length) return;

  // Clear previous markers if needed
  const markers = document.getElementsByClassName('mapboxgl-marker');
  while (markers.length > 0) {
    markers[0].remove();
  }

  filtered.forEach(center => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.width = '24px';
    el.style.height = '24px';
    el.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/684/684908.png')";
    el.style.backgroundSize = 'cover';
    el.style.borderRadius = '50%';
    el.style.cursor = 'pointer';

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <h3>${center.name}</h3>
      <p>${center.address}</p>
    `);

    new mapboxgl.Marker(el)
      .setLngLat([center.coordinates.lng, center.coordinates.lat])
      .setPopup(popup)
      .addTo(mapRef.current);
  });
};

  

  const handleGetCurrentLocation = async () => {
  navigator.geolocation.getCurrentPosition(
  async (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    setUserCoords({ lat, lng });
    console.log(lat);
    console.log(lng);
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [lng, lat], zoom: 13 });
    }

    // Call backend API to get centers
    try {
      const response = await fetch(
  `http://localhost:5000/ngos/nearby?lat=${lat}&lng=${lng}&distance=${maxDistance}`

      );
      const data = await response.json();
      setFiltered(data);
      toast.success(`Found ${data.length} centers near you`);
    } catch (err) {
      toast.error("Failed to fetch nearby centers");
    }
  },
  (err) => {
    console.error("Geolocation error:", err);
    alert("Failed to get your current location.");
  },
  {
    enableHighAccuracy: true,
    timeout: 15000, // 15 seconds
    maximumAge: 0,  // Don't use cached position
  }
);

};

//   const fetchNearbyRecyclingCenters = async (lat, lng) => {
//   const query = `https://nominatim.openstreetmap.org/search.php?q=ngo+near+${lat},${lng}&format=jsonv2`;

//   try {
//     const response = await fetch(query);
//     const data = await response.json();

//     const formatted = data.map((item, idx) => ({
//       id: idx,
//       name: item.display_name,
//       coordinates: {
//         lat: parseFloat(item.lat),
//         lng: parseFloat(item.lon),
//       },
//       address: item.display_name,
//       accepts: ["general aid"], // you can customize
//       hours: "Unknown",
//       phone: "N/A",
//     }));

//     setFiltered(formatted);
//     toast.success('Found ${formatted.length} NGOs near you');
//   } catch (err) {
//     console.error("Failed to fetch NGOs", err);
//     toast.error("Failed to fetch NGOs near you");
//   }
// };

  const handleSearch = async () => {
  if (!searchTerm) return;

  try {
    // 1. Get coordinates from Mapbox Geocoding API
    const geoResponse = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm)}.json?access_token=${mapboxToken}`
    );
    const geoData = await geoResponse.json();

    if (!geoData.features.length) {
      toast.error("No location found.");
      return;
    }

    const [lng, lat] = geoData.features[0].center;
    console.log("lng:",lng);
    console.log("lat",lat);
    setUserCoords({ lat, lng });

    // 2. Fly map to new location
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 12 });

    // 3. Send coordinates to backend
    const backendResponse = await fetch(
  `http://localhost:5000/ngos/nearby?lat=${lat}&lng=${lng}&distance=${maxDistance}`
);

    const data = await backendResponse.json();

    setFiltered(data);
    toast.success(`Found ${data.length} centers near "${searchTerm}"`);
  } catch (err) {
    console.error("Search failed:", err);
    toast.error("Search failed");
  }
};


  useEffect(() => {
    initializeMap([77.209, 28.613]); // Delhi default
  }, []);

  useEffect(() => {
    addMarkers();
  }, [filtered]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(to right, #15803d, #0369a1)' }}>
              Find Recycling Centers
            </h1>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Locate recycling and waste disposal facilities near you.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-grow space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex">
                  <Input
                    id="location"
                    placeholder="Enter address or city"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="button" variant="outline" className="ml-2 flex-shrink-0"
                          onClick={handleGetCurrentLocation}>
                    <MapPin size={18} className="mr-2" />
                    <span className="hidden sm:inline">Use Current</span>
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSearch} className="h-10">
                  <Search size={18} className="mr-2" />
                  Search
                </Button>
                {/* <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-10">
                  <Filter size={18} className="mr-2" />
                  Filters
                </Button> */}
              </div>
            </div>

            {showFilters && (
              <div className="mt-6 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="waste-type">Type of Waste</Label>
                  <Select value={selectedWasteType} onValueChange={setSelectedWasteType}>
                    <SelectTrigger id="waste-type">
                      <SelectValue placeholder="All waste types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All waste types</SelectItem>
                      {wasteTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Maximum Distance</Label>
                  <Select value={maxDistance} onValueChange={setMaxDistance}>
                    <SelectTrigger id="distance">
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Within 5 miles</SelectItem>
                      <SelectItem value="10">Within 10 miles</SelectItem>
                      <SelectItem value="25">Within 25 miles</SelectItem>
                      <SelectItem value="50">Within 50 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 md:mt-8">
                  <Checkbox id="open-now" checked={openOnly} onCheckedChange={setOpenOnly} />
                  <Label htmlFor="open-now" className="cursor-pointer">Show open centers only</Label>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 order-2 lg:order-1 space-y-6">
              {filtered.length ? filtered.map((center) => (
                <div key={center._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h3 className="text-lg font-semibold mb-1">{center.name}</h3>
                  <div className="text-sm text-foreground/70 mb-3">{center.distance || 'Nearby'}</div>
                  <div className="text-sm text-foreground/70 mb-1">{center.address}</div>
                  <div className="text-sm text-foreground/70 mb-1">{center.phone}</div>
                  <div className="text-sm text-foreground/70 mb-2">{center.hours}</div>
                  <div className="flex flex-wrap gap-2">
                    {center.accepts?.map((type) => (
                      <span key={type} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {wasteTypes.find(w => w.value === type)?.label || type}
                      </span>
                    ))}
                  </div>
                </div>
              )) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium mb-2">No centers found</h3>
                  <Button onClick={() => setFiltered(centers)}>Reset Filters</Button>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-gray-100 rounded-xl overflow-hidden h-[500px] relative">
              <div
  ref={mapContainerRef}
  className="absolute inset-0 z-0"
  style={{ height: "100%", minHeight: "500px" }}
/>

              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default RecyclingCenters;