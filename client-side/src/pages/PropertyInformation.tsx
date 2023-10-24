import {
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  Rectangle,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import * as FlatColor from "react-icons/fc";
import * as Ri from "react-icons/ri";
import * as Si from "react-icons/si";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SidePanel from "../components/panel/SidePanel";

import Property from "../interfaces/Property";

import "leaflet/dist/leaflet.css";
import "../assets/css/leaflet-map.css";
import { LatLng, LatLngBoundsExpression, LatLngExpression } from "leaflet";

function LocationMarker() {
  const [position, setPosition] = useState<LatLng>({
    lat: 180,
    lng: -180,
  } as LatLng);
  const map = useMapEvents({
    click(e) {
      alert(e.latlng);
      // map.locate();
    },
    locationfound(e) {
      // alert(e.latlng);
      setPosition(e.latlng);
      // map.flyTo(e.latlng, map.getZoom());
    },
  });
  const theMap = useMap();

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const PropertyInformation = () => {
  /* HOOKS */
  const { nic } = useParams();
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/digital-property/api/properties/${nic}`)
      .then((res) => res.json().then((data) => setProperties(data)))
      .catch((error) => console.log(error));
  }, [nic]);

  /* ELEMENT */
  const PanelHeader = (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2>{nic}</h2>
    </div>
  );

  /* CONST DATA */
  const PanelContent = [
    {
      title: "About",
      type: "menu-title",
      onItemClick: () => {},
    },
    {
      title: "Health",
      type: "nav-item",
      icon: <Ri.RiHealthBookFill />,
      path: `/health/${nic}`,
      onItemClick: () => {},
    },
    {
      title: "Finance",
      type: "nav-item",
      path: `/finance/${nic}`,
      icon: <Si.SiStarlingbank />,
      onItemClick: () => {},
    },
    {
      title: "Property",
      type: "nav-item",
      path: `/property/${nic}`,
      icon: <FlatColor.FcApproval />,
      onItemClick: () => {},
    },
  ];

  // const polyline: LatLngExpression[] = [
  //   [-21.348404, 46.654323],
  //   [-21.448404, 46.754323],
  //   [-21.248404, 46.554323],
  // ];
  // const multiPolyline: LatLngExpression[][] = [
  //   [
  //     [-19.448404, 48.754323],
  //     [-18.448404, 48.654323],
  //     [-17.948404, 48.754323],
  //   ],
  //   [
  //     [-19.148404, 48.254323],
  //     [-18.748404, 47.354323],
  //     [-19.548404, 47.754323],
  //   ],
  // ];
  // const polygon: LatLngExpression[] = [
  //   [-19.548404, 48.654323],
  //   [-21.448404, 46.754323],
  //   [-20.448404, 49.154323],
  // ];

  // const rectangle: LatLngBoundsExpression = [
  //   [-19.448404, 48.754323],
  //   [-18.448404, 47.754323],
  // ];

  // const fillBlueOptions = { fillColor: "blue" };
  // const blackOptions = { color: "black" };
  // const limeOptions = { color: "lime" };
  // const purpleOptions = { color: "purple" };
  // const redOptions = { color: "red" };

  return (
    <div className="d-flex justify-content-between">
      <SidePanel
        header={PanelHeader}
        currentPageIndex={3}
        panelItems={PanelContent}
      />
      <section className="mt-5 d-flex flex-column align-items-center w-100">
        <div className="card border-0">
          <div className="card-body">
            {properties && properties.length > 0 && (
              <div className="basic-info shadow-sm p-3">
                <h3 className="text-start">
                  <b>Properties :</b>
                </h3>
                <table className="table mt-5">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Acquisition date</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property: Property, index: number) => (
                      <tr key={property.ID}>
                        <th>{index + 1}</th>
                        <th>{property.acquisitionDate + ""}</th>
                        <td>{property.name}</td>
                        <td>{property.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {(!properties || properties.length === 0) && (
              <h1 className="text-danger fw-bolder">
                This person do not have any property yet
              </h1>
            )}
            <MapContainer
              className="mt-5"
              center={[-20.348404, 47.654323]}
              zoom={5}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* <Marker position={[-20.348404, 47.654323]}>
                <Popup>This is Madagascar</Popup>
              </Marker> */}
              <LocationMarker />

              {/* <Polyline pathOptions={limeOptions} positions={polyline} />
              <Polyline pathOptions={limeOptions} positions={multiPolyline} />
              <Polygon pathOptions={purpleOptions} positions={polygon} />
              <Rectangle bounds={rectangle} pathOptions={blackOptions} /> */}
            </MapContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyInformation;
