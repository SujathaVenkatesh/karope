import { Link, useParams } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";


const usersData = [
  {
    id: 1,
    name: "Rohit",
    mobile: "9123456987",
    email: "rohit@gmail.com",
    location: "Chennai",
    wallet: "₹1000.00",
    dob: "April 20, 2002",
    pincode: "6000028"

  },

  {

    id: 2,
    name: "Suriya",
    mobile: "9123456988",
    email: "suriya@gmail.com",
    location: "Chennai",
    wallet: "₹1040.00",
    dob: "April 20, 2002",
    pincode: "6000028"

  },

  {
    id: 3,
    name: "Priya",
    mobile: "9123456999",
    email: "priya@gmail.com",
    location: "Chennai",
    wallet: "₹2000.00",
    dob: "April 20, 2002",
    pincode: "6000028"

  },

  {
    id: 4,
    name: "Roshan",
    mobile: "9123456900",
    email: "roshan@gmail.com",
    location: "Chennai",
    wallet: "₹0.00",
    dob: "April 20, 2002",
    pincode: "6000028"

  }
];


const recharge = [
  {
    id: "1",
    userId: "1",
    transactionId: "TXN-123456",
    name: "Rohit",
    mobile: "9123456987",
    operator: "Airtel",
    type: "Prepaid",
    amount: 799,
    payment: "UPI",
    status: "Success",
    date: "Jan 02, 2026",
    time: "11:03 AM",
    validity: "Mar 02, 2026",

  },

  {

    id: "2",
    userId: "2",
    transactionId: "TXN-123457",
    name: "Suriya",
    mobile: "9123456988",
    operator: "Airtel",
    type: "Prepaid",
    amount: 1029,
    payment: "UPI",
    status: "Success",
    date: "Oct 21, 2025",
    time: "11:03 AM",
    validity: "Jan 02, 2026",

  },

  {
    id: "3",
    userId: "3",
    transactionId: "TXN-123458",
    name: "Priya",
    mobile: "9123456999",
    operator: "Airtel",
    type: "Prepaid",
    amount: 409,
    payment: "UPI",
    status: "Success",
    date: "Oct 21, 2025",
    time: "11:03 AM",
    validity: "Jan 02, 2026",
  },

  {
    id: "4",
    userId: "4",
    transactionId: "None",
    name: "Roshan",
    mobile: "9123456900",
    operator: "None",
    type: "None",
    amount: "None",
    payment: "None",
    status: "None",
    date: "None",
    time: "None",
    validity: "None",
  }
]

const UserDetails = () => {
  const { id } = useParams();
  const user = usersData.find((u) => u.id === Number(id));

  if (!user) {
    return <h5 className="text-center mt-5">User not found</h5>;
  }

  //   table filter
  const userrecharge = recharge.filter(
    (r) => String(r.userId) === String(id)
  );


  return (
    <div className="container-fluid">

      {/* PAGE HEADER */}
      <div className="mb-3">
        <h4 className="poppins-bold text-color">Users List</h4>
        <p className="text-muted poppins-regular mb-0">
          View Particular User Details from a Centralized Dashboard.
        </p>
      </div>

      {/* USER INFO CARD */}
      <div className="card shadow-sm mb-4">
        <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

          {/* LEFT */}
          <div className="d-flex align-items-center gap-4">
            <FaUser className="rounded-circle border border-success" size={90} />
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h5 className="mb-0 poppins-bold">{user.name}</h5>

                <button
                  className="btn btn-sm poppins-semibold px-3 text-white ms-2"
                  style={{ backgroundColor: "#399C41" }}
                >
                  Chat Now
                </button>
              </div>

              {/* FIRST ROW */}
              <div className="d-flex align-items-center flex-wrap text-muted poppins-regular gap-3 mb-1">
                <div className="d-flex align-items-center gap-2">
                  <FaPhoneAlt size={14} />
                  <span>{user.mobile}</span>
                </div>

                <span className="text-muted">|</span>

                <div className="d-flex align-items-center gap-2">
                  <FaBirthdayCake size={14} />
                  <span>{user.dob}</span>
                </div>

                <span className="text-muted">|</span>

                <div className="d-flex align-items-center gap-2">
                  <IoMdMail size={15} />
                  <span>{user.email}</span>
                </div>
              </div>

              {/* SECOND ROW */}
              <div className="d-flex align-items-center flex-wrap text-muted poppins-regular gap-3">
                <div className="d-flex align-items-center gap-2">
                  <MdHome size={16} />
                  <span>{user.location}</span>
                </div>

                <span className="text-muted">|</span>

                <div className="d-flex align-items-center gap-2">
                  <FaLocationDot size={15} />
                  <span>{user.pincode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-end mt-3 mt-lg-0">
            <div className="border rounded px-3 py-2 mb-2 text-center shadow">
              <small className="text-muted poppins-regular ">Wallet Balance</small>
              <div className="poppins-semibold">{user.wallet}</div>
            </div>

            <button className="btn btn-sm w-100 poppins-semibold text-white" style={{ backgroundColor: "#F11619" }}>
              Deactivate
            </button>
          </div>

        </div>
      </div>

      {/* RECHARGE HISTORY */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="poppins-bold text-color mb-3">
            Recharge History
          </h5>

          <div className="table-responsive poppins-medium">
            <table className="table table-bordered align-middle text-center mb-0">
              <thead>
                <tr className="custom-table-head th">
                  <th>S.no</th>
                  <th>Transaction ID</th>
                  <th>Mobile Number</th>
                  <th>Operation</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                  <th>Validity</th>
                </tr>
              </thead>

              <tbody className="poppins-medium">
                {userrecharge.map((data, i) => (
                  <tr key={data.id}>
                    <td>{i + 1}</td>
                    <td>{data.transactionId}</td> 

                    <td>
                      {/* <h6 className="mb-0">{user.name}</h6> */}
                      <span className="text-muted">{user.mobile}</span>
                    </td>

                    <td>{data.operator}</td>
                    <td>{data.type}</td>
                    <td>₹{data.amount}</td>
                    <td>{data.payment}</td>

                    <td
                      className={`fw-semibold ${data.status === "Success"
                        ? "text-success"
                        : "text-danger"
                        }`}
                    >
                      {data.status}
                    </td>

                    <td>
                      {data.date}
                      <br />
                      <small className="text-muted">{data.time}</small>
                    </td>

                    <td>{data.validity}</td>
                  </tr>
                ))}

                {userrecharge.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-center text-muted py-4">
                      No recharge history found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserDetails;