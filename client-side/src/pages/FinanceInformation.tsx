import * as FlatColor from "react-icons/fc";
import * as Ri from "react-icons/ri";
import * as Si from "react-icons/si";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SidePanel from "../components/panel/SidePanel";
import axios from "../http-client-side/Axios";

import BankAccount from "../interfaces/BankAccount";
import BankTransaction from "../interfaces/BankTransaction";

const FinanceInformation = () => {
  /* HOOKS */
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("AR");
  const { nic } = useParams();
  const [sold, setSold] = useState(0);
  const [bankAccount, setBankAccount] = useState({} as BankAccount);
  const [bankTransaction, setBankTransaction] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5205/api/bank-accounts/${nic}`)
      .then((res) => {
        console.log(res);
        res.json().then((data) => setBankAccount(data));
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
    fetch(`http://localhost:5205/api/bank-accounts/${nic}/sold`)
      .then((res) => {
        console.log(res);
        res.json().then((data) => setSold(data));
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
    fetch(`http://localhost:5205/api/bank-transactions/${nic}`)
      .then((res) => res.json().then((data) => setBankTransaction(data)))
      .catch((error) => {
        alert(error);
        console.log(error);
      });
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

  const onTransfer = async () => {
    if (nic) {
      const formData = new FormData();
      formData.append("from", nic);
      formData.append("to", destination);
      formData.append("amount", amount + "");
      formData.append("currency", currency);
      await axios
        .post("http://localhost:5205/api/bank-transactions/transfer", formData)
        .then((res) => {
          alert("Ok");
          setDestination("");
          setAmount(0);
        })
        .catch((value) => {
          console.log(value.response);
          alert(
            value.response && value.response.data ? value.response.data : value
          );
        });
    }
  };

  return (
    <div className="d-flex justify-content-between">
      <SidePanel
        header={PanelHeader}
        currentPageIndex={2}
        panelItems={PanelContent}
      />
      <section className="mt-5 d-flex flex-column align-items-center w-100">
        <div className="card border-0">
          <div className="card-body">
            <div className="mb-5 d-flex justify-content-end align-items-center">
              <p className="m-0">
                Transfer to :{" "}
                <input
                  type="text"
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                  defaultValue={destination}
                  placeholder="xxxxxxxxxxx"
                />{" "}
                <input
                  className="me-2"
                  type="number"
                  defaultValue={amount}
                  onChange={(e) => {
                    setAmount(parseFloat(e.target.value));
                  }}
                />
                <select
                  className="me-2"
                  onChange={(e) => {
                    setCurrency(e.target.value);
                  }}
                >
                  <option value="AR">AR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </p>
              <button className="btn btn-primary" onClick={onTransfer}>
                Transfer
              </button>
            </div>
            {bankAccount.nic && (
              <div className="basic-info shadow-sm p-3">
                <h3 className="text-start">
                  <b>Bank transaction :</b>
                </h3>
                <table className="table mt-5">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankTransaction.map(
                      (transaction: BankTransaction, index: number) => (
                        <tr key={transaction.transactionId}>
                          <th>{index + 1}</th>
                          <th>{transaction.transactionDate + ""}</th>
                          <td>{transaction.amount}</td>
                          <td>{transaction.description}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <h1 className="mt-5 text-end">
                  Sold : <span className="text-success">{sold}</span>
                </h1>
              </div>
            )}
            {!bankAccount.nic && (
              <h1 className="text-danger fw-bolder">
                This person do not have a bank account yet
              </h1>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinanceInformation;
