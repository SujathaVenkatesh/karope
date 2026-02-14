import { useState, useEffect } from "react";
import airtel from "../assets/img/airtel.png";
import jio from "../assets/img/jio.png";
import vi from "../assets/img/vi.png";
import bsnl from "../assets/img/bsnl.png";
import { MdEdit, MdDelete } from "react-icons/md";

import {
  useCashpostMutation,
  useCashupdateMutation,
  useCashdeleteMutation,
  useCashlistQuery,
} from "../Redux/Api/Api";

const operators = [
  { name: "Airtel", logo: airtel },
  { name: "Jio", logo: jio },
  { name: "VI", logo: vi },
  { name: "BSNL", logo: bsnl },
];

const Operatorsetting = () => {
  const { data, refetch } = useCashlistQuery();
  const [cashpost] = useCashpostMutation();
  const [cashupdate] = useCashupdateMutation();
  const [cashdelete] = useCashdeleteMutation();

  const [rules, setRules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [cashback, setCashback] = useState("");
  const [editRowIndex, setEditRowIndex] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!data) return;

    const formatted = data.map((item) => ({
      id: item.id,
      minAmount: Number(item.min_amount),
      maxAmount: Number(item.max_amount),
      cashbackAmount: Number(item.cashback_amount),
    }));

    setRules(formatted);
  }, [data]);

  /* ================= ADD ================= */
  const handleAdd = async () => {
    try {
      await cashpost({
        minAmount: Number(minAmount),
        maxAmount: Number(maxAmount),
        cashbackAmount: Number(cashback),
      }).unwrap();

      setShowModal(false);
      setMinAmount("");
      setMaxAmount("");
      setCashback("");
      await refetch();
    } catch (err) {
      console.error("ADD ERROR:", err);
    }
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async (index) => {
    try {
      const rule = rules[index];

      await cashupdate({
        id: rule.id,
        body: {
          minAmount: Number(rule.minAmount),
          maxAmount: Number(rule.maxAmount),
          cashbackAmount: Number(rule.cashbackAmount),
        },
      }).unwrap();

      setEditRowIndex(null);
      await refetch();
    } catch (err) {
      console.error("UPDATE ERROR:", err);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    try {
      await cashdelete({ id: selected.id }).unwrap();
      setShowDelete(false);
      setSelected(null);
      await refetch();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  const updateRule = (index, field, value) => {
    const updated = [...rules];
    updated[index][field] = value;
    setRules(updated);
  };

  return (
    <div className="container-fluid">

      {/* HEADER */}
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

      {/* OPERATOR CARDS */}
      <div className="card shadow-sm bg-white mb-4">
        <div className="card-body">
          <h5 className="poppins-bold text-color mb-3">Operators</h5>
          <div className="d-flex flex-wrap gap-3">
            {operators.map((op) => (
              <div
                key={op.name}
                className="border rounded text-center p-3"
                style={{ width: "150px", background: "#f9fff9" }}
              >
                <img src={op.logo} width={90} alt={op.name} />
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
                <tr key={rule.id}>
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
                    ) : `₹${rule.minAmount}`}
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
                    ) : `₹${rule.maxAmount}`}
                  </td>

                  <td>
                    {editRowIndex === index ? (
                      <input
                        className="form-control"
                        value={rule.cashbackAmount}
                        onChange={(e) =>
                          updateRule(index, "cashbackAmount", e.target.value)
                        }
                      />
                    ) : `₹${rule.cashbackAmount}`}
                  </td>

                  <td>
                    {editRowIndex === index ? (
                      <button
                        className="btn text-white poppins-semibold"
                        style={{ backgroundColor: "#399C41" }}
                        onClick={() => handleUpdate(index)}
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
                          onClick={() => {
                            setSelected(rule);
                            setShowDelete(true);
                          }}
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
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">

                {/* Modal Header */}
                <div
                  className="modal-header text-white"
                  style={{ backgroundColor: "#399c41" }}
                >
                  <h5 className="poppins-bold mb-0">
                    Add Recharge Rule
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                {/* Modal Body */}
                <div className="modal-body">

                  <div className="row g-3 mb-3">
                    <div className="col-md-6 poppins-regular">
                      <label>Minimum Amount</label>
                      <input
                        className="form-control"
                        placeholder="Enter Amount"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 poppins-regular">
                      <label>Maximum Amount</label>
                      <input
                        className="form-control"
                        placeholder="Enter Amount"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="poppins-regular">
                    <label>Cashback</label>
                    <input
                      className="form-control"
                      placeholder="Enter Cashback"
                      value={cashback}
                      onChange={(e) => setCashback(e.target.value)}
                    />
                  </div>

                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary poppins-semibold"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn text-white poppins-semibold"
                    style={{ backgroundColor: "#399C41" }}
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}


      {/* DELETE MODAL */}
      {showDelete && (
        <>
          <div
            className="modal fade show d-block"
            style={{ background: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-danger text-white">
                  <h5 className="poppins-bold">Delete</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowDelete(false)}
                  />
                </div>

                <div className="modal-body poppins-regular">
                  Are you sure you want to delete?
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary poppins-semibold"
                    onClick={() => setShowDelete(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-danger poppins-semibold"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
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
