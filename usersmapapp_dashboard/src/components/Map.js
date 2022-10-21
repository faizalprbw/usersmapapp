import axios from "axios";
import React, { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useSWR from "swr";


const fetcher = (url) => axios.get(url).then((res) => res.data);

export const Map = () => {
   const [usersloc, setUsersloc] = useState(null);
   const { data, error } = useSWR("/profiles", fetcher);
   const userprofiles = data && !error ? data : {};
   const position = [-6.195, 106.823];
   const zoom = 13;

   if (error) {
      return <Alert variant="danger">Smoething Wrong</Alert>;
   }
   if (!data) {
      return (
         <Spinner
            animation="border"
            variant="danger"
            role="status"
            style={{
               width: "200px",
               height: "200px",
               margin: "auto",
               display: "block",
            }}
         />
      );
   }
   return (
      <MapContainer center={position} zoom={zoom}>
         <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         {userprofiles.features.map((userprofile) => (
            <Marker
               key={userprofile.properties.name}
               position={[
                  userprofile.geometry.coordinates[1],
                  userprofile.geometry.coordinates[0],
               ]}
               onClick={() => {
                  setUsersloc(userprofile);
               }}
            >
               <Popup
                  position={[
                     userprofile.geometry.coordinates[1],
                     userprofile.geometry.coordinates[0],
                  ]}
                  onClose={() => {
                     setUsersloc(null);
                  }}
               >
                  <div>
                     <h6>{userprofile.properties.username}</h6>
                  </div>
               </Popup>
            </Marker>
         ))}
      </MapContainer>
   );
};