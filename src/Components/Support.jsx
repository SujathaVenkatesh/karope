import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdEdit, MdDelete } from "react-icons/md";
import {
  useLazySupportQuery,
  useSupportticketQuery,
  useSupportreplayMutation,
  useSupportfaqlistQuery,
  useSupportfaqcreateMutation,
  useSupportfaqupdateMutation,
  useSupportfaqdeleteMutation,

} from "../Redux/Api/Api";

const Support = () => {
  /* ================= TAB STATE ================= */
  const [activeTab, setActiveTab] = useState("frequent");

  /* ================= STATUS FILTER ================= */
  const [statusFilter, setStatusFilter] = useState("opened");

  /* ================= USER MESSAGE STATE ================= */
  const [selectedUser, setSelectedUser] = useState(null);
  const [reply, setReply] = useState("");
  /* ================= API CALLS ================= */

  // Status wise list
  // const {
  //   data: supportList,
  //   refetch: refetchSupportList,
  // } = useLazySupportQuery({ status: statusFilter });
// const[getSupportTickets] = useLazySupportQuery();



// 1️⃣ Lazy support list
const [getSupportTickets, { data: supportData, isLoading }] =
  useLazySupportQuery();

// 2️⃣ Conversation hook
const {
  data: ticketConversation,
  refetch: refetchConversation,
} = useSupportticketQuery(selectedUser?.ticketId, {
  skip: !selectedUser?.ticketId,
});
useEffect(() => {
  console.log("Selected User:", selectedUser);
  console.log("Conversation Data:", ticketConversation);
}, [selectedUser, ticketConversation]);



// 3️⃣ Reply mutation
const [supportReply] = useSupportreplayMutation();

// 4️⃣ Now useEffects
useEffect(() => {
  const status =
    statusFilter === "opened"
      ? "OPEN"
      : statusFilter === "answered"
      ? "ANSWERED"
      : "RESOLVED";

  getSupportTickets({ status });
}, [statusFilter]);

useEffect(() => {
  console.log("Conversation:", ticketConversation);
}, [ticketConversation]);


  // useEffect(() => {
  //   supportReply().unwrap().then((res) => {
  //     setSupportList(res);
  //   })
  //   .catch((err) => console.log(err));
  // }, [statusFilter]);

  /* ================= SEND MESSAGE ================= */
const handleSend = async () => {
  console.log("Send clicked"); // 👈 add this

  if (!reply.trim() || !selectedUser) {
    console.log("Reply or user missing");
    return;
  }

  try {
await supportReply({
  id: selectedUser.ticketId,
  message: reply,
}).unwrap();





    console.log("Reply success");
    setReply("");
    refetchConversation();
  } catch (err) {
    console.log("Reply error:", err);
  }
};


const getStatusColor = (status) => {
  if (status === "OPEN") return "text-danger";
  if (status === "ANSWERED") return "text-warning";
  if (status === "RESOLVED") return "text-success";
};


  /* ================= FREQUENT QUERIES ================= */

/* ================= API ================= */
const {
  data: queries,
  refetch,
} = useSupportfaqlistQuery();

const [createFaq] = useSupportfaqcreateMutation();
const [updateFaq] = useSupportfaqupdateMutation();
const [deleteFaq] = useSupportfaqdeleteMutation();

const [showAdd, setShowAdd] = useState(false);
const [showEdit, setShowEdit] = useState(false);
const [showDelete, setShowDelete] = useState(false);

const [currentId, setCurrentId] = useState(null);
const [title, setTitle] = useState("");
const [category, setCategory] = useState("Technical");

const handleAdd = async () => {
  if (!title) return alert("Enter Query Title");

  try {
    await createFaq({
      question: title,
      answer: category,
    }).unwrap();

    setTitle("");
    setCategory("Technical");
    setShowAdd(false);
    refetch();
  } catch (err) {
    console.error(err);
  }
};

const openEdit = (item) => {
  setCurrentId(item.id);
  setTitle(item.question);
  setCategory(item.category || "Technical");
  setShowEdit(true);
};

const handleEdit = async () => {
  try {
    await updateFaq({
      id: currentId,
      question: title,
      answer: category,
    }).unwrap();

    setShowEdit(false);
    setCurrentId(null);
    refetch();
  } catch (err) {
    console.error(err);
  }
};

const openDelete = (id) => {
  setCurrentId(id);
  setShowDelete(true);
};

const handleDelete = async () => {
  try {
    await deleteFaq({ id: currentId }).unwrap();

    setShowDelete(false);
    setCurrentId(null);
    refetch();
  } catch (err) {
    console.error(err);
  }
};

  
  return (
    <div className="container-fluid">

      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="poppins-bold text-color">Support</h4>
          <p className="text-muted mb-0 poppins-regular">
            Manage and resolve user support queries efficiently
          </p>
        </div>

        {activeTab === "frequent" && (
          <button
            className="btn px-4 text-white poppins-semibold"
            onClick={() => {
              setShowAdd(true);
              setTitle("");
              setCategory("Technical");
            }}
            style={{ backgroundColor: "#399C41" }}
          >
            Add
          </button>
        )}
      </div>

      {/* ================= TABS ================= */}
      <div className="card shadow-sm rounded-4 p-3 mb-4">
        <div className="d-flex justify-content-center gap-3">
<button
  className={`btn px-4 poppins-semibold ${
    activeTab === "frequent" ? "tab-active" : "tab-inactive"
  }`}
  onClick={() => setActiveTab("frequent")}
>
  Frequent Queries
</button>

<button
  className={`btn px-4 poppins-semibold ${
    activeTab === "messages" ? "tab-active" : "tab-inactive"
  }`}
  onClick={() => setActiveTab("messages")}
>
  User Messages
</button>

        </div>
      </div>

      {/* ================= FREQUENT ================= */}
      {activeTab === "frequent" && (
        <div className="card p-3 mb-4 mt-5">
          <div className="table-responsive text-center poppins-medium">
            <table className="table table-bordered align-middle">
              <thead className="custom-table-head">
                <tr>
                  <th>S.no</th>
                  <th>Query Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {queries?.map((q, index) => (
                  <tr key={q.id}>
                    <td>{index + 1}</td>
<td>{q.question}</td>
                    <td>
                      <MdEdit
                        className="text-muted me-3"
                        role="button"
                        onClick={() => openEdit(q)}
                      />
                      <MdDelete
                        className="text-muted"
                        role="button"
                        onClick={() => openDelete(q.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

{activeTab === "messages" && (
  <div className="row">

    {/* LEFT SIDE */}
    <div className="col-lg-7 border-end">

      <div className="mb-3">
        <select
          className="form-select w-auto form-control"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="opened">Opened</option>
          <option value="answered">Answered</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {isLoading && <p>Loading...</p>}
{/* {supportData?.data?.length === 0 && (
  <p>No tickets found</p>
)} */}
<div className="card p-3 shadow-sm rounded-4">
  <div className="table-responsive">
    <table className="table table-bordered align-middle text-center">
      <thead className="custom-table-head">
        <tr>
          <th>S.no</th>
          <th>User</th>
          <th>Mobile</th>
          <th>Issue Type</th>
          <th>Date & Time</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {(supportData || []).map((user, index) => (
          <tr
            key={user.ticketId}
            style={{ cursor: "pointer" }}
            className={
              selectedUser?.ticketId === user.ticketId
                ? "selected-row"
                : ""
            }
            onClick={() => {
              console.log("Clicked user:", user);
              setSelectedUser(user);
            }}
          >
            <td>{index + 1}</td>
            <td className="fw-semibold">{user.user}</td>
            <td>{user.mobile}</td>
            <td>{user.issueType}</td>
            <td>{user.lastMessageAt}</td>
            <td
              className={`fw-semibold ${getStatusColor(
                user.status
              )}`}
            >
              {user.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


    </div>

{/* RIGHT SIDE CHAT */}
<div className="col-lg-5">
  {selectedUser ? (
    <div
      className="card shadow-sm rounded-4 d-flex flex-column"
      style={{ height: "600px" }}
    >
      {/* HEADER */}
      <div className="card-header bg-light d-flex align-items-center">
        <div
          className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
          style={{ width: "45px", height: "45px" }}
        >
          {selectedUser.user?.charAt(0)}
        </div>

        <div className="ms-3">
          <div className="fw-bold">
            {selectedUser.user}
          </div>
          <div className="small text-muted">
            {selectedUser.ticketId} | {selectedUser.issueType}
          </div>
        </div>
      </div>

      {/* CHAT BODY */}
{/* CHAT BODY */}
<div className="card-body overflow-auto">
  {(ticketConversation?.messages ||
    ticketConversation?.data?.messages ||
    []
  ).map((msg, i) => {

    const isAdmin =
      msg.sender === "ADMIN" ||
      msg.sender === "admin" ||
      msg.sender === "system";

    return (
      <div
        key={i}
        className={`d-flex mb-3 ${
          isAdmin
            ? "justify-content-end"
            : "justify-content-start"
        }`}
      >
        <div
          className={`p-3 rounded-4 ${
            isAdmin ? "text-white" : "bg-light"
          }`}
          style={{
            maxWidth: "75%",
            backgroundColor: isAdmin
              ? "#3c9b3f"
              : "",
          }}
        >
          {/* ✅ MESSAGE */}
          <div>{msg.message}</div>

          {/* ✅ TIME */}
          <div
            className="small mt-1"
            style={{
              opacity: 0.7,
              fontSize: "12px",
            }}
          >
            {msg.datetime}
          </div>
        </div>
      </div>
    );
  })}
</div>




      {/* FOOTER INPUT */}
      <div className="card-footer bg-white border-0">
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Type your message here..."
            value={reply}
            onChange={(e) =>
              setReply(e.target.value)
            }
          />

          <button
            onClick={handleSend}
            className="btn ms-2 rounded-circle text-white"
            style={{
              backgroundColor: "#3c9b3f",
              width: "45px",
              height: "45px",
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center mt-5 text-muted">
      Click a user from the left to open chat
    </div>
  )}
</div>

  </div>
)}

            {/* ================= ADD MODAL ================= */}
<div
  className={`modal fade ${showAdd ? "show d-block" : ""}`}
  tabIndex="-1"
  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content rounded-4">

      <div
        className="modal-header text-white"
        style={{ backgroundColor: "#399C41" }}
      >
        <h5 className="modal-title poppins-bold">Add Query</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={() => setShowAdd(false)}
        ></button>
      </div>

      <div className="modal-body poppins-regular">
        <div className="mb-3">
          <label className="form-label">Query Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Technical">Technical</option>
            <option value="Account">Account</option>
          </select>
        </div>
      </div>

      <div className="modal-footer justify-content-end">
        <button
          className="btn btn-secondary px-4 poppins-semibold"
          onClick={() => setShowAdd(false)}
        >
          Cancel
        </button>
        <button
          className="btn text-white px-4 poppins-semibold"
          style={{ backgroundColor: "#399C41" }}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

    </div>
  </div>
</div>

{/* ================= EDIT MODAL ================= */}
<div
  className={`modal fade ${showEdit ? "show d-block" : ""}`}
  tabIndex="-1"
  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content rounded-4">

      <div
        className="modal-header text-white"
        style={{ backgroundColor: "#399C41" }}
      >
        <h5 className="modal-title poppins-bold">Edit Query</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={() => setShowEdit(false)}
        ></button>
      </div>

      <div className="modal-body poppins-regular">
        <div className="mb-3">
          <label className="form-label">Query Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

      </div>

      <div className="modal-footer justify-content-end">
        <button
          className="btn btn-secondary px-4 poppins-semibold"
          onClick={() => setShowEdit(false)}
        >
          Cancel
        </button>
        <button
          className="btn text-white px-4 poppins-semibold"
          style={{ backgroundColor: "#399C41" }}
          onClick={handleEdit}
        >
          Update
        </button>
      </div>

    </div>
  </div>
</div>

{/* ================= DELETE MODAL ================= */}
<div
  className={`modal fade ${showDelete ? "show d-block" : ""}`}
  tabIndex="-1"
  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content rounded-4">

      <div className="modal-header bg-danger text-white">
        <h5 className="modal-title poppins-bold">Delete Query</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={() => setShowDelete(false)}
        ></button>
      </div>

      <div className="modal-body text-center poppins-regular">
        Are you sure you want to delete this query?
      </div>

      <div className="modal-footer justify-content-end">
        <button
          className="btn btn-secondary px-4 poppins-semibold"
          onClick={() => setShowDelete(false)}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger px-4 poppins-semibold"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

    </div>
  </div>
</div>

    </div>
  );
}
export default Support;