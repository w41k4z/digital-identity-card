import * as FlatColor from "react-icons/fc";
import * as Ri from "react-icons/ri";
import * as Si from "react-icons/si";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SidePanel from "../components/panel/SidePanel";
import BasicCRUDTable from "../components/datatable/BasicCRUDTable";
import { TableColumn } from "../components/datatable/TableColumn";

import axios from "../http-client-side/Axios";

import Person from "../interfaces/Person";
import HealthDetail from "../interfaces/HealthDetail";

const HealthInformation = () => {
  /* HOOKS */
  const { nic } = useParams();
  const [person, setPerson] = useState({} as Person);
  const [healthDetail, setHealthDetail] = useState<HealthDetail[]>([]);
  const [newHealthDetail, setNewHealthDetail] = useState({} as HealthDetail);
  useEffect(() => {
    fetch(`http://localhost:8080/digital-health/api/people/${nic}`)
      .then((res) => res.json())
      .then((data) => setPerson(data));
    fetch(`http://localhost:8080/digital-health/api/health-info/${nic}`)
      .then((res) => res.json())
      .then((data) => setHealthDetail(data));
  }, [nic]);

  /* ELEMENT */
  const PanelHeader = (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2>{nic}</h2>
    </div>
  );

  const insertModalFormInputs = [
    {
      label: (
        <label htmlFor="date" className="form-label">
          From date
        </label>
      ),
      input: (
        <input
          type="date"
          className="form-control"
          onChange={(e) => {
            setNewHealthDetail({
              ID: newHealthDetail.ID,
              personNationalIdentityCard:
                newHealthDetail.personNationalIdentityCard,
              fromDate: new Date(e.target.value),
              category: newHealthDetail.category,
              description: newHealthDetail.description,
            });
          }}
          id="date"
        />
      ),
    },
    {
      label: (
        <label htmlFor="categ" className="form-label">
          Category
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setNewHealthDetail({
              ID: newHealthDetail.ID,
              personNationalIdentityCard:
                newHealthDetail.personNationalIdentityCard,
              fromDate: newHealthDetail.fromDate,
              category: e.target.value,
              description: newHealthDetail.description,
            });
          }}
          id="categ"
        />
      ),
    },
    {
      input: (
        <textarea
          rows={2}
          className="form-control"
          placeholder="Description..."
          onChange={(e) => {
            setNewHealthDetail({
              ID: newHealthDetail.ID,
              personNationalIdentityCard:
                newHealthDetail.personNationalIdentityCard,
              fromDate: newHealthDetail.fromDate,
              category: newHealthDetail.category,
              description: e.target.value,
            });
          }}
        />
      ),
    },
  ];

  const updateModalFormInputs = (row: HealthDetail) => [
    {
      label: (
        <label htmlFor="categ" className="form-label">
          Category
        </label>
      ),
      input: (
        <input
          type="text"
          className="form-control"
          defaultValue={row.category}
          id="cated"
        />
      ),
    },
    {
      input: (
        <textarea
          rows={2}
          className="form-control"
          placeholder="Description..."
          defaultValue={row.description}
        />
      ),
    },
  ];

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

  const columns: TableColumn[] = [
    {
      name: "From date",
      propTarget: "fromDate",
      format: "default",
    },
    {
      name: "Category",
      propTarget: "category",
      format: "default",
    },
    {
      name: "Description",
      propTarget: "description",
      format: "default",
    },
  ];

  /* LOGIC */
  const createNewHealthDetail = async () => {
    if (nic) {
      const formData = new FormData();
      formData.append("personNationalIdentityCard", nic);
      formData.append("fromDate", newHealthDetail.fromDate + "");
      formData.append("category", newHealthDetail.category);
      formData.append("description", newHealthDetail.description);
      await axios
        .post("localhost:8080/digital-health/api/health-info", formData)
        .then((res) => {
          const newHealthDetails = [...healthDetail];
          newHealthDetails.push(res.data);
          setHealthDetail(newHealthDetails);
          alert("insertion ok");
        })
        .catch((value) => {
          alert(value);
        });
    }
  };

  return (
    <div className="d-flex justify-content-between">
      <SidePanel
        header={PanelHeader}
        currentPageIndex={1}
        panelItems={PanelContent}
      />
      <section className="mt-5 d-flex flex-column align-items-center w-100">
        <div className="card border-0">
          <div className="card-body">
            {person && (
              <div className="basic-info shadow-sm p-3">
                <h3 className="text-start">
                  <b>Basic information :</b>
                </h3>
                <table className="table mt-5">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">First name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Phone number</th>
                      <th scope="col">Blood type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{person.name}</td>
                      <td>{person.firstName}</td>
                      <td>{person.address}</td>
                      <td>{person.phoneNumber}</td>
                      <th scope="row">{person.bloodType}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {healthDetail && (
              <div className="mt-5 health-info shadow-sm p-3">
                <h3 className="text-start">
                  <b>Health information :</b>
                </h3>
                <table className="table mt-5">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">From</th>
                      <th scope="col">Category</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {healthDetail.map((detail: HealthDetail, index: number) => (
                      <tr key={detail.ID}>
                        <td>{index + 1}</td>
                        <td>{detail.fromDate + ""}</td>
                        <td>{detail.category}</td>
                        <td>{detail.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* {healthDetail && (
              <BasicCRUDTable
                title={"Health information"}
                indexedRow
                columns={columns}
                data={healthDetail}
                dataPropIDName={"ID"}
                addModalFormInputs={insertModalFormInputs}
                onAdd={() => {}}
                onUpdate={() => {}}
                onDelete={() => {}}
                updateModalFormInputs={updateModalFormInputs}
                uploadCall={() => {}}
              />
            )} */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthInformation;
