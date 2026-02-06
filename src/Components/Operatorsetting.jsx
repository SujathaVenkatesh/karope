import { useState } from "react";
import airtel from "../assets/img/airtel.png";
import jio from "../assets/img/jio.png";
import vi from "../assets/img/vi.png";
import bsnl from "../assets/img/bsnl.png";
import { MdEdit, MdDelete } from "react-icons/md";

const operators = [
  { name: "Airtel", logo: airtel },
  { name: "Jio", logo: jio },
  { name: "VI", logo: vi },
  { name: "BSNL", logo: bsnl },
];

const Operatorsetting = () => {
  const [rules, setRules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [cashback, setCashback] = useState("");
  const [editRowIndex, setEditRowIndex] = useState(null);

  const closeModal = () => {
    setShowModal(false);
    setMinAmount("");
    setMaxAmount("");
    setCashback("");
    setEditRowIndex(null);
  };

  const handleAdd = () => {
    setRules([
      ...rules,
      { minAmount, maxAmount, cashback },
    ]);
    closeModal();
  };

  const updateRule = (index, field, value) => {
    const updated = [...rules];
    updated[index][field] = value;
    setRules(updated);
  };

  const handleDelete = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  return (
    <div className="container-fluid">

      {/* HEADER + ADD BUTTON */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h4 className="poppins-bold text-color">
            Recharge Operator Settings
          </h4>
          <p className="text-muted poppins-regular mb-0">
            Configure Recharge Limits and Cashback Values.
          </p>
        </div>

        <button
          className="btn text-white poppins-semibold px-4"
          style={{ backgroundColor: "#399C41" }}
          onClick={() => setShowModal(true)}
        >
          + Add
        </button>
      </div>

      {/* OPERATOR CARDS (DISPLAY ONLY) */}
      <div className="card shadow-sm bg-white mb-4">
        <div className="card-body">
          <h5 className="poppins-bold text-color mb-3">Operators</h5>
          <div className="d-flex flex-wrap gap-3">
            {operators.map((op) => (
              <div
                key={op.name}
                className="border rounded text-center p-3"
                style={{
                  width: "150px",
                  background: "#f9fff9",
                }}
              >
                <img src={op.logo} width={90} alt={op.name} />
                {/* <div className="poppins-semibold mt-2">{op.name}</div> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm bg-white poppins-medium">
        <div className="card-body table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="custom-table-head">
              <tr>
                <th>S.No</th>
                <th>Minimum Amount</th>
                <th>Maximum Amount</th>
                <th>Cashback</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {rules.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-muted py-4">
                    No operator rules added
                  </td>
                </tr>
              )}

              {rules.map((rule, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    {editRowIndex === index ? (
                      <input
                        className="form-control"
                        value={rule.minAmount}
                        onChange={(e) =>
                          updateRule(index, "minAmount", e.target.value)
                        }
                      />
                    ) : (
                      `₹${rule.minAmount}`
                    )}
                  </td>

                  <td>
                    {editRowIndex === index ? (
                      <input
                        className="form-control"
                        value={rule.maxAmount}
                        onChange={(e) =>
                          updateRule(index, "maxAmount", e.target.value)
                        }
                      />
                    ) : (
                      `₹${rule.maxAmount}`
                    )}
                  </td>

                  <td>
                    {editRowIndex === index ? (
                      <input
                        className="form-control"
                        value={rule.cashback}
                        onChange={(e) =>
                          updateRule(index, "cashback", e.target.value)
                        }
                      />
                    ) : (
                      `₹${rule.cashback}`
                    )}
                  </td>

                  <td>
                    {editRowIndex === index ? (
                      <button
                        className="btn text-white poppins-semibold"
                        style={{ backgroundColor: "#399C41" }}
                        onClick={() => setEditRowIndex(null)}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm text-muted me-2"
                          onClick={() => setEditRowIndex(index)}
                        >
                          <MdEdit size={18} />
                        </button>
                        <button
                          className="btn btn-sm text-muted"
                          onClick={() => handleDelete(index)}
                        >
                          <MdDelete size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD MODAL */}
      {showModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-body p-4">
                  <h5 className="poppins-bold mb-3">Add Recharge Rule</h5>
                  <hr />

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label poppins-regular">Minimum Amount</label>
                      <input
                        className="form-control poppins-regular"
                        placeholder="₹100"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label poppins-regular">Maximum Amount</label>
                      <input
                        className="form-control poppins-regular"
                        placeholder="₹200"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <label className="form-label poppins-regular">Cashback</label>
                  <input
                    className="form-control mb-4 poppins-regular"
                    placeholder="₹20"
                    value={cashback}
                    onChange={(e) => setCashback(e.target.value)}
                  />

                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-secondary poppins-semibold" onClick={closeModal}>
                      Cancel
                    </button>
                    <button
                      className=" btn px-4 text-white poppins-semibold"
                      style={{ backgroundColor: "#399C41" }}
                      onClick={handleAdd}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default Operatorsetting;
