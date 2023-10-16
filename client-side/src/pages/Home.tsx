import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../http-client-side/Axios";

import logo from "../assets/images/DIC.jpg";

const Home = () => {
  const [nic, setNic] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    await axios
      .get(`http://localhost:8080/digital-health/api/people/${nic}`)
      .then((res) => {
        if (res.data === null) {
          alert("No such person");
        } else {
          navigate(`/health/${nic}`);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="home d-flex justify-content-center align-items-center w-100 blurry-background">
      <div className="card w-75">
        <div className="card-body">
          <section className="row">
            <img src={logo} alt="Logo" className="col-md-6" />
            <div className="col-md-6 mt-md-0 mt-sm-5 d-flex flex-column justify-content-center align-items-center">
              <h1 style={{ color: "#5386d7" }}>Digital Identity Card</h1>
              <p className="quote mt-2">
                Carry your entire identity securely in your pocket with our
                Digital Identity Card app
              </p>
              <input
                className="borderless-bottom-input mt-3"
                type="text"
                onChange={(e) => setNic(e.target.value)}
                placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxx"
                required
              />
              <button
                className="btn btn-primary mt-4 w-75"
                onClick={() => handleClick()}
              >
                SUBMIT
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
