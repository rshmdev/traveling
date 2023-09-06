import GoogleMapReact from "google-map-react";
import { Image } from "@chakra-ui/react";
import pointer from "../assets/pointer.png";
import "../styles/Map.css";

export default function Map({
  coordinates,
  setCoordinates,
  setBounds,
  places,
  setChildClick,
}) {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  return (
    <div className="mapContainer">
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${apiKey}` }}
        defaultCenter={coordinates}
        options={""}
        onChildClick={(child) => {
          setChildClick(child);
        }}
        margin={[50, 50, 50, 50]}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        center={coordinates}
        defaultZoom={14}
      >
        {places
          ?.filter((item) => item.detail !== "0")
          .map((place, i) => (
            <div
              className="markerContainer"
              key={i}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
            >
              <Image
                src={pointer}
                alt="Pointer at location"
                paddingBottom={8}
                title={place.name}
              />
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
}
