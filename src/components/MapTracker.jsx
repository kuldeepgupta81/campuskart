import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 📍 MAP AUTO CENTER
function Recenter({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [position]);

  return null;
}

export default function MapTracker() {

  // 🟢 START (warehouse)
  const start = [26.8467, 80.9462];

  // 🔴 END (user location)
  const end = [26.8567, 80.9562];

  const [position, setPosition] = useState(start);

  useEffect(() => {
    let i = 0;

    const steps = 50;

    const interval = setInterval(() => {
      i++;

      const lat = start[0] + ((end[0] - start[0]) * i) / steps;
      const lng = start[1] + ((end[1] - start[1]) * i) / steps;

      setPosition([lat, lng]);

      if (i >= steps) clearInterval(interval);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={start}
      zoom={13}
      className="h-56 w-full rounded mt-2"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 🟢 Delivery Boy */}
      <Marker position={position} />

      {/* Auto follow */}
      <Recenter position={position} />
    </MapContainer>
  );
}