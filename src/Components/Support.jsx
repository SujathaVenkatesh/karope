import "../Style/support.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const queries = [
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

  return (
    <div className="support-wrapper">
      <h2 className="support-title">Support</h2>
      <p className="support-subtitle">
        Manage and resolve user support queries efficiently
      </p>

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
              <FiEdit />
              <FiTrash2 />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
