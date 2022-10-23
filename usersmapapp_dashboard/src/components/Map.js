import axios from "axios";
import React, { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useSWR from "swr";
import MarkerClusterGroup from 'react-leaflet-cluster'
import L, { MarkerCluster } from "leaflet";
import 'leaflet/dist/leaflet.css'


const fetcher = (url) => axios.get(url).then((res) => res.data);

export const Map = () => {
   const [usersloc, setUsersloc] = useState(null);
   const { data, error } = useSWR("/profiles", fetcher);
   const userprofiles = data && !error ? data : {};
   const position = [-6.195, 106.823];
   const zoom = 10;

   const customIcon = new L.Icon({
      iconUrl: require("./location.svg").default,
      iconSize: new L.Point(40, 47)
    });

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
   console.log(userprofiles);
   return (
      <MapContainer center={position} zoom={zoom}>
         <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <MarkerClusterGroup
            chunkedLoading
         >
         {userprofiles.features.map((userprofile) => (
            <Marker
               icon={customIcon}
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
                     <img src={userprofile.properties.photo} className='leaflet-popup-img'></img>
                     <h6>{userprofile.properties.name}</h6>
                     <h6>{userprofile.properties.phone_number}</h6>
                     <h6>{userprofile.properties.department}</h6>
                  </div>
               </Popup>
            </Marker>
         ))}
         </MarkerClusterGroup>
      </MapContainer>
   );
};
