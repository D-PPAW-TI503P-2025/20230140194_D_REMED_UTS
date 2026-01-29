import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView({ latitude, longitude }) {
  return (
    <div className="map-box">
      <MapContainer center={[latitude, longitude]} zoom={13} style={{height:"300px"}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker position={[latitude, longitude]}>
          <Popup>Lokasi Peminjaman</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;
