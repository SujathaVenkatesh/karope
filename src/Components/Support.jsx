import "../Style/support.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

/* ===== DATA ===== */
const queriesData = [
  {
    sno: 1,
    title: "Facing issue with recent recharge",
    category: "Technical",
    status: "Published",
    time: "Jan 23, 2026 3:33 PM",
  },
  {
    sno: 2,
    title: "My mobile recharge failed. What should I do?",
    category: "Technical",
    status: "Published",
    time: "Jan 23, 2026 3:33 PM",
  },
  {
    sno: 3,
    title: "How to change Mobile number?",
    category: "Account",
    status: "Published",
    time: "Jan 23, 2026 3:33 PM",
  },
  {
    sno: 4,
    title: "Money was deducted but recharge is not successful. Why?",
    category: "Technical",
    status: "Published",
    time: "Jan 23, 2026 3:33 PM",
  },
];

export default function Support() {
  const navigate = useNavigate();

  const [queries, setQueries] = useState(queriesData);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({ title: "", category: "" });

  const openAddModal = () => {
    setIsEdit(false);
    setFormData({ title: "", category: "" });
    setOpenModal(true);
  };

  const openEditModal = (q) => {
    setIsEdit(true);
    setFormData({ title: q.title, category: q.category });
    setOpenModal(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!formData.title || !formData.category) return;

    if (!isEdit) {
      setQueries([
        ...queries,
        {
          sno: queries.length + 1,
          title: formData.title,
          category: formData.category,
          status: "Published",
          time: new Date().toLocaleString(),
        },
      ]);
    }
    setOpenModal(false);
  };

  return (
    <div className="support-wrapper">
      {/* Header */}
      <div className="support-header">
        <div>
          <h2 className="support-title">Support</h2>
          <p className="support-subtitle">
            Manage and resolve user support queries efficiently
          </p>
        </div>
        <button className="add-btn" onClick={openAddModal}>
          Add
        </button>
      </div>

      {/* Tabs */}
      <div className="support-tabs">
        <button className="tab active">Frequent Queries</button>
        <button className="tab" onClick={() => navigate("/support")}>
          User Messages
        </button>
      </div>

      {/* Table */}
      <div className="support-card">
        <div className="support-head">
          <span>S.no</span>
          <span>Query Title</span>
          <span>Category</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {queries.map((q) => (
          <div className="support-row" key={q.sno}>
            <span>{q.sno}</span>
            <span className="query-title">{q.title}</span>
            <span>{q.category}</span>
            <span className="status">
              {q.status}
              <small>{q.time}</small>
            </span>
            <span className="actions">
              <FiEdit onClick={() => openEditModal(q)} />
              <FiTrash2 />
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{isEdit ? "Edit Query" : "Add Query"}</h3>

            <label>Query Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Facing issue with recent recharge"
            />

            <label>Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Technical"
            />

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
