import * as FlatColor from "react-icons/fc";
import * as Ri from "react-icons/ri";
import * as Si from "react-icons/si";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SidePanel from "../components/panel/SidePanel";

import Property from "../interfaces/Property";

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
            {properties && properties.length > 1 && (
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyInformation;
