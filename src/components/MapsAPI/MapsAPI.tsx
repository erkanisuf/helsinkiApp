import React from "react";
import noImage from "../../staticimages/No_Image_Available.jpg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//In index.html in public is also putted CSS from leaflet otherwise wont work !

interface Props {
  lat: number;
  lon: number;
  name: string;
  address: {
    street_address: string;
    postal_code: string;
    locality: string;
  };
  image: string;
}
const MapsAPI: React.FC<Props> = ({ lat, lon, name, address, image }) => {
  return (
    <div style={{ height: "400px" }}>
      <MapContainer
        scrollWheelZoom={false}
        center={[lat, lon]}
        zoom={20}
        style={{ height: "400px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]}>
          <Popup>
            <h2 style={{ margin: "0" }}>{name}</h2> <br />{" "}
            {address.street_address},{address.postal_code}
            <br />
            <img width="60%" src={image ? image : noImage} alt={"map image"} />
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapsAPI;
