import { useState } from "react";
import airtel from "../assets/img/airtel.png";
import jio from "../assets/img/jio.png";
import vi from "../assets/img/vi.png";
import bsnl from "../assets/img/bsnl.png";

const operators = [
  { name: "Airtel", logo: airtel },
  { name: "Jio", logo: jio },
  { name: "VI", logo: vi },
  { name: "BSNL", logo: bsnl },
];

const Operatorsetting = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [cashback, setCashback] = useState("");

  const openModal = (operator) => {
    setSelectedOperator(operator);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setMinAmount("");
    setMaxAmount("");
    setCashback("");
  };

  return (
    <div className="container-fluid">
      {/* HEADER */}
      <div className="mb-4">
        <h4 className="poppins-bold text-color">Recharge Operator Settings</h4>
        <p className="text-muted mb-0 poppins-regular">
          Configure recharge limits and reward for each network provider.
        </p>
      </div>

      {/* OPERATOR CARDS */}
      <div className="card shadow-sm bg-white">
        <div className="card-body">
          <h5 className="poppins-bold mb-3 text-color">Operators</h5>

          <div className="d-flex flex-wrap gap-3">
            {operators.map((op) => (
              <div
                key={op.name}
                className="border rounded p-3 text-center"
                style={{
                  width: "150px",
                  height: "130px",
                  cursor: "pointer",
                  backgroundColor: "#f9fff9",
                }}
                onClick={() => openModal(op)}
              >
                <img src={op.logo} alt={op.name} width={100} />
                <p className="mt-2 mb-0 poppins-semibold">{op.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body p-4">
                  <div className="d-flex align-items-center mb-3 gap-2">
                    <img
                      src={selectedOperator.logo}
                      alt={selectedOperator.name}
                      width={80}
                    />
                    <div>
                      <h6 className="mb-0 poppins-semibold">
                        Configure {selectedOperator.name} Recharge
                      </h6>
                      <p className="text-muted poppins-regular">
                        Update rules for mobile recharge cashback
                      </p>
                    </div>

                  </div>

                  <hr />

                  <h6 className="poppins-bold">Recharge Limits</h6>

                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label poppins-medium small">
                        Minimum Recharge Amount
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="₹ 100"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                      />
                    </div>

                    <div className="col-6">
                      <label className="form-label poppins-medium  small">
                        Maximum Recharge Amount
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="₹ 200"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <h6 className="poppins-bold">Rewards</h6>

                  <div className="mb-4">
                    <label className="form-label poppins-medium  small">
                      Cashback Value
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="₹ 20"
                      value={cashback}
                      onChange={(e) => setCashback(e.target.value)}
                    />
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-secondary btn-sm px-4 poppins-semibold"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-sm px-4 text-white poppins-semibold" style={{ backgroundColor: "#399C41" }}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BACKDROP */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default Operatorsetting;
