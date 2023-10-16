import React from "react";
import Home from "./pages/Home";
import HealthInformation from "./pages/HealthInformation";
import FinanceInformation from "./pages/FinanceInformation";
import PropertyInformation from "./pages/PropertyInformation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./assets/css/Home.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health/:nic" element={<HealthInformation />} />
          <Route path="/finance/:nic" element={<FinanceInformation />} />
          <Route path="/property/:nic" element={<PropertyInformation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
