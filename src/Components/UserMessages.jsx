import "../Style/supportuser.css";
import avatar from "../assets/img/man.png";
import { useNavigate } from "react-router-dom";

const users = [
  {
    id: 1,
    name: "Rohit",
    mobile: "9874563210",
    issue: "Recharge Failed",
    date: "Jan 28, 2026",
    time: "11:09 AM",
    status: "open",
  },
  {
    id: 2,
    name: "Kishore",
    mobile: "9874563211",
    issue: "Recharge Failed",
    date: "Jan 28, 2026",
    time: "11:09 AM",
    status: "replied",
  },
  {
    id: 3,
    name: "Gayathri",
    mobile: "9874563212",
    issue: "Payment Error",
    date: "Jan 28, 2026",
    time: "11:09 AM",
    status: "open",
  },
  {
    id: 4,
    name: "Priya",
    mobile: "9874563213",
    issue: "Payment Error",
    date: "Jan 28, 2026",
    time: "11:09 AM",
    status: "resolved",
  },
];

export default function SupportUser() {
  const navigate = useNavigate(); // ✅

  return (
    <div className="support-wrapper">
      <h2 className="support-title">Support</h2>
      <p className="support-subtitle">
        Manage and resolve user support queries efficiently
      </p>

      <div className="support-tabs">
        <button className="tab" onClick={() => navigate("/frequent")}>
          Frequent Queries
        </button>

        <button className="tab active">User Messages</button>
      </div>

      <div className="support-layout">
        {/* LEFT TABLE */}
        <div className="support-card">
          <div className="support-head">
            <span>S.no</span>
            <span>User</span>
            <span>Mobile</span>
            <span>Issue Type</span>
            <span>Date & Time</span>
            <span>Status</span>
          </div>

          {users.map((u) => (
            <div className="support-row" key={u.id}>
              <span>{u.id}</span>
              <span>{u.name}</span>
              <span>{u.mobile}</span>
              <span>{u.issue}</span>
              <span className="date">
                {u.date}
                <small>{u.time}</small>
              </span>
              <span className={`status ${u.status}`}>{u.status}</span>
            </div>
          ))}
        </div>

        {/* RIGHT CHAT */}
        <div className="chat-card">
          <div className="chat-header">
            <img src={avatar} alt="" />
            <div>
              <h4>Rohit</h4>
              <p>TXN-123456 | Recharge Failed</p>
            </div>
          </div>

          <div className="chat-body">
            <div className="chat-date">Today</div>

            <div className="chat-msg left">
              Hi, I tried to recharge my mobile for 799 but the transaction
              failed. The amount was deducted from my account. Can you check?
              <span>11:09 AM</span>
            </div>

            <div className="chat-msg right">
              Hello Rohit! I see the transaction TXN-123456 is stuck in Pending
              state at the gateway. I’m investigating this now.
              <span>11:30 AM</span>
            </div>
          </div>

          <div className="chat-input">
            <input placeholder="Type your message here..." />
            <button>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}
