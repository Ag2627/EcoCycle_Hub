// import React, { useEffect, useRef } from "react";
// //import mapboxgl from "mapbox-gl";
// // import "mapbox-gl/dist/mapbox-gl.css";
// // import "../../styles/map.css";

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// const RecyclingMap = ({ centers, userLocation, selectedFilter }) => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (!userLocation) return;

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: userLocation,
//       zoom: 13,
//     });

//     mapRef.current = map;

//     // Add markers
//     centers.forEach((center) => {
//       if (
//         !selectedFilter ||
//         (center.materials && center.materials.includes(selectedFilter))
//       ) {
//         new mapboxgl.Marker()
//           .setLngLat(center.coords)
//           .setPopup(new mapboxgl.Popup().setHTML(`<strong>${center.name}</strong>`))
//           .addTo(map);
//       }
//     });

//     return () => map.remove();
//   }, [userLocation, centers, selectedFilter]);

//   return <div ref={mapContainerRef} className="map-container" />;
// };

// export default RecyclingMap;
