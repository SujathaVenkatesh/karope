// import { useState } from "react";
// import { MdDelete } from "react-icons/md";

// export default function Notification() {

//     const [rows] = useState([
//         {
//             id: 1, users: "REU", type: "Recharge", title: "Recharge Reminder",
//             msg: "Your recharge is expiring soon", date: "Jan 23, 2026", time: "3:33 PM"
//         },
//         {
//             id: 2, users: "All", type: "General", title: "v2.0.0 is out",
//             msg: "Download now", date: "Jan 22, 2026", time: "4:00 PM"
//         }
//     ]);

//     return (
//         <div className="container-fluid">

//             <h4 className="poppins-bold text-color">Notification</h4>
//             <p className="text-muted poppins-regular">Monitor and Manage All User Notifications</p>

//             {/* TOP CARD */}
//             <div className="card shadow-sm mb-4">
//                 <div className="card-body">

//                     <div className="row g-3 ">

//                         <div className="col-md-4">
//                             <label className="poppins-regular ">Select Users</label>
//                             <select className="form-select form-control text-muted poppins-regular mt-2">
//                                 <option>Recharge Expire Users</option>
//                             </select>
//                         </div>

//                         <div className="col-md-4">
//                             <label className="poppins-regular">Type</label>
//                             <select className="form-select form-control poppins-regular mt-2 text-muted">
//                                 <option>Recharge</option>
//                             </select>
//                         </div>

//                         <div className="col-md-4">
//                             <label className="poppins-regular">Title</label>
//                             <select className="form-select form-control poppins-regular mt-2 text-muted">
//                                 <option>Recharge Reminder</option>
//                             </select>
//                         </div>

//                         <div className="col-12">
//                             <label className="poppins-regular">Message</label>
//                             <textarea
//                                 rows="4"
//                                 className="form-control poppins-regular text-muted mt-2 "
//                                 placeholder="Your recharge is expiring soon.
// Recharge now to avoid service interruption and continue enjoying benefits."
//                             />
//                         </div>

//                         <div className="text-end">
//                             <button className="btn text-white px-4 poppins-semibold" style={{ background: "#399c41" }}>
//                                 Send
//                             </button>
//                         </div>

//                     </div>
//                 </div>
//             </div>

//             {/* TABLE CARD */}



//             <div className="card shadow-sm mt-5">
//                 <div className="card-body">
//                     <h5 className="poppins-bold text-color">Notification / View / Delete</h5>

//                     <div className="row g-3 mb-3">

//                         <div className="col-md-4">
//                             <label className="poppins-regular">Type</label>
//                             <input className="form-control poppins-regular text-muted mt-2" placeholder="Search" />
//                         </div>

//                         <div className="col-md-4">
//                             <label className="poppins-regular">From Date</label>
//                             <input type="date" className="form-control poppins-regular text-muted mt-2" />
//                         </div>

//                         <div className="col-md-4">
//                             <label className="poppins-regular">To Date</label>
//                             <input type="date" className="form-control poppins-regular text-muted mt-2" />
//                         </div>

//                     </div>

//                     <table className="table table-bordered align-middle poppins-medium text-center">

//                         <thead className="custom-table-head">
//                             <tr>
//                                 <th>S.no</th>
//                                 <th>Users</th>
//                                 <th>Type</th>
//                                 <th>Title</th>
//                                 <th>Message</th>
//                                 <th>Date & Time</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>

//                             {rows.map(x => (
//                                 <tr key={x.id}>

//                                     <td>{x.id}</td>
//                                     <td>{x.users}</td>
//                                     <td>{x.type}</td>

//                                     <td>{x.title}</td>
//                                     <td>{x.msg}</td>

//                                     <td className="text-center">
//                                         {x.date}<br />
//                                         <small className="text-muted">{x.time}</small>
//                                     </td>

//                                     <td className="text-center">
//                                         <MdDelete size={18} className="text-muted" />
//                                     </td>

//                                 </tr>
//                             ))}

//                         </tbody>

//                     </table>

//                 </div>
//             </div>

//         </div>
//     );
// }



// import { useState } from "react";
// import { useNotificationsendMutation } from "../Redux/Api/Api";

// const Notification = () => {

//   const [notificationsend] = useNotificationsendMutation();

//   const [users, setUsers] = useState("");
//   const [type, setType] = useState("Recharge");
//   const [title, setTitle] = useState("Recharge Reminder");
//   const [message, setMessage] = useState("");

//   const handleSend = async () => {
//     if (!message) return alert("Enter message");

//     try {
//       let payload = {

//         type: type.toLowerCase(),

//         message:message,
//       }

//       if (users !== "all" && users !== "")
//       {
//         payload.userId = users;
//       }

//       await notificationsend(payload).unwrap()
//       alert("Notification Sent Successfully");
//       setMessage(""); // clear textarea after send

//     } catch (error) {
//       console.error(error);
//       alert("Failed to send notification");
//     }
//   };

//   return (
//     <div className="container-fluid">

//       <h4 className="poppins-bold text-color">Notification</h4>
//       <p className="text-muted poppins-regular">
//         Monitor and Manage All User Notifications
//       </p>

//       <div className="card shadow-sm mb-4">
//         <div className="card-body">

//           <div className="row g-3">

//             {/* Select Users */}
//             <div className="col-md-4">
//               <label className="poppins-regular">Select Users</label>
//               <select
//                 className="form-select mt-2 form-control"
//                 value={users}
//                 onChange={(e) => setUsers(e.target.value)}
//               >
//                 <option value="recharge">Recharge Expire Users</option>
//                 <option value="all">All Users</option>
//               </select>
//             </div>

//             {/* Type */}
//             <div className="col-md-4">
//               <label className="poppins-regular">Type</label>
//               <select
//                 className="form-select mt-2 form-control"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//               >
//                 <option>Recharge</option>
//                 <option>General</option>
//               </select>
//             </div>

//             {/* Title */}
//             <div className="col-md-4">
//               <label className="poppins-regular">Title</label>
//               <select
//                 className="form-select mt-2 form-control"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               >
//                 <option>Recharge Reminder</option>
//                 <option>System Update</option>
//               </select>
//             </div>

//             {/* Message */}
//             <div className="col-12">
//               <label className="poppins-regular">Message</label>
//               <textarea
//                 rows="4"
//                 className="form-control mt-2"
//                 placeholder="Type your message here..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//             </div>

//             {/* Send Button */}
//             <div className="text-end">
//               <button
//                 className="btn text-white px-4 poppins-semibold"
//                 style={{ background: "#399c41" }}
//                 onClick={handleSend}
//               >
//                 Send
//               </button>
//             </div>

//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }
// export default Notification;



import { useState } from "react";
import {
  useNotificationsendMutation,
  useNotificationsentQuery,
  useUserlistQuery,
} from "../Redux/Api/Api";

const Notification = () => {

  /* ---------------- API ---------------- */
  const [notificationsend] = useNotificationsendMutation();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useNotificationsentQuery({ page, limit });
  const { data: userData, isLoading: userLoading } = useUserlistQuery();


  /* ---------------- FORM STATES ---------------- */
  const [formData, setFormData] = useState({
    userId: "",
    type: "",
    title: "",
    message: "",
  });

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log("Notification GET:", data);


  /* ---------------- SEND FUNCTION ---------------- */
  const handleSend = async () => {
    try {
      const body = {
        userId: formData.userId === "all" ? null:formData.userId,
        type: formData.type,
        message: formData.message,
      };

      const res = await notificationsend(body).unwrap();

      console.log("Send Success:", res);



      // Optional: clear form
      setFormData({
        userId: "",
        type: "",
        title: "",
        message: "",
      });

    } catch (error) {
      console.log("Send Error:", error);
    }
  };


  return (
    <div className="container-fluid">

      <h4 className="poppins-bold text-color">Notification</h4>
      <p className="text-muted poppins-regular">
        Monitor and Manage All User Notifications
      </p>

      {/* TOP CARD */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">

            <div className="col-md-4">
              <label className="poppins-regular">Select Users</label>
              <select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="form-select form-control text-muted poppins-regular mt-2"
              >
                <option value="">Select User</option>
                <option value="all">All</option>

                {userData?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>

            </div>

            <div className="col-md-4">
              <label className="poppins-regular">Type</label>
              <input type="text" disabled
                name="type"
                placeholder="Admin"
                value={formData.type}
                onChange={handleChange}
                className="form-control poppins-regular mt-2 text-muted"
              >

              </input>
            </div>

            <div className="col-md-4">
              <label className="poppins-regular">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control poppins-regular mt-2"
                placeholder="Enter Title"
              />
            </div>

            <div className="col-12">
              <label className="poppins-regular">Message</label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control poppins-regular mt-2"
                placeholder="Enter your message"
              />
            </div>

            <div className="text-end">
              <button
                onClick={handleSend}
                className="btn text-white px-4 poppins-semibold"
                style={{ background: "#399c41" }}
              >
                Send
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="card shadow-sm mt-5">
        <div className="card-body">
          <h5 className="poppins-bold text-color">
            Notification / View / Delete
          </h5>

          <table className="table table-bordered align-middle poppins-medium text-center">

            <thead className="custom-table-head">
              <tr>
                <th>S.no</th>
                <th>Users</th>
                <th>Message</th>
                <th>Date & Time</th>

              </tr>
            </thead>

            <tbody>
              {Array.isArray(data?.notifications) && data.notifications.length > 0 ? (
                data.notifications.map((x, index) => (
                  <tr key={x.id}>
                    <td>{(page - 1) * limit + index + 1}</td>


                    {/* USERS */}
                    <td>{x.user_name || "-"}</td>

                    {/* MESSAGE */}
                    <td>{x.content}</td>

                    {/* DATE & TIME */}
                    <td>
                      {new Date(x.created_at).toLocaleDateString("en-GB")}
                      <br />
                      <small className="text-muted">
                        {new Date(x.created_at).toLocaleTimeString()}
                      </small>
                    </td>
                  </tr>
                ))

              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    No notifications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex justify-content-end align-items-center mt-3 gap-2">

        <button
          className="btn btn-sm btn-secondary poppins-semibold"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span className="poppins-semibold text-muted">
          Page {data?.pagination?.page} of {data?.pagination?.totalPages}
        </span>

        <button
          className="btn btn-sm btn-secondary poppins-semibold" style={{ backgroundColor: "#399C41" }}
          disabled={page === data?.pagination?.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Notification;
