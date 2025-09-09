import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon path when bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

export default function MapView({ monasteries, onSelect }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstanceRef.current) return; // init once
    mapInstanceRef.current = L.map(mapRef.current).setView([27.3, 88.5], 9);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(mapInstanceRef.current);
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    // Layer to hold markers
    if (map._markersLayer) {
      map._markersLayer.clearLayers();
    } else {
      map._markersLayer = L.layerGroup().addTo(map);
    }

    monasteries.forEach((m) => {
      const marker = L.marker([m.lat, m.lng]).addTo(map._markersLayer);
      marker.bindPopup(`<b>${m.name}</b>`);
      marker.on("click", () => onSelect(m));
    });
  }, [monasteries, onSelect]);

  return <div id="map" ref={mapRef} style={{ height: "320px", margin: "12px 0" }} />;
}
