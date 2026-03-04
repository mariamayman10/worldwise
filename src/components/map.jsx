import { useNavigate } from "react-router-dom";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Popup, useMap, useMapEvents } from "react-leaflet";
import { Marker } from "react-leaflet";
import styles from "./map.module.css";
import useCities from "../features/cities/useCities";
import useGeolocation from "../customHooks/useGeolocation";
import Button from "./button";
import { useUrlPosition } from "../customHooks/useUrlPosition";
import { useEffect, useState } from "react";

function Map() {
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();
  // const mapPosition =
  //   mapLat && mapLng
  //     ? [mapLat, mapLng]
  //     : geolocationPosition
  //       ? [geolocationPosition.lat, geolocationPosition.lng]
  //       : [40, 0];

        const [mapPosition, setMapPosition] = useState([40, 0]);
        useEffect(
          function () {
            if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
          },
          [mapLat, mapLng],
        );

        useEffect(
          function () {
            if (geolocationPosition)
              setMapPosition([
                geolocationPosition.lat,
                geolocationPosition.lng,
              ]);
          },
          [geolocationPosition],
        );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={20}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((c) => (
          <Marker position={[c.position.lat, c.position.lng]} key={c.id}>
            <Popup>
              <span>{c.emoji}</span>
              <span>{c.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
