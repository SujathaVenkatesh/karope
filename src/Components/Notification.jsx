import { useState } from "react";
import { MdDelete } from "react-icons/md";

export default function Notification() {

    const [rows] = useState([
        {
            id: 1, users: "REU", type: "Recharge", title: "Recharge Reminder",
            msg: "Your recharge is expiring soon", date: "Jan 23, 2026", time: "3:33 PM"
        },
        {
            id: 2, users: "All", type: "General", title: "v2.0.0 is out",
            msg: "Download now", date: "Jan 22, 2026", time: "4:00 PM"
        }
    ]);

    return (
        <div className="container-fluid">

            <h4 className="poppins-bold text-color">Notification</h4>
            <p className="text-muted poppins-regular">Monitor and Manage All User Notifications</p>

            {/* TOP CARD */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">

                    <div className="row g-3 ">

                        <div className="col-md-4">
                            <label className="poppins-regular ">Select Users</label>
                            <select className="form-select form-control text-muted poppins-regular mt-2">
                                <option>Recharge Expire Users</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="poppins-regular">Type</label>
                            <select className="form-select form-control poppins-regular mt-2 text-muted">
                                <option>Recharge</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="poppins-regular">Title</label>
                            <select className="form-select form-control poppins-regular mt-2 text-muted">
                                <option>Recharge Reminder</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <label className="poppins-regular">Message</label>
                            <textarea
                                rows="4"
                                className="form-control poppins-regular text-muted mt-2 "
                                placeholder="Your recharge is expiring soon.
Recharge now to avoid service interruption and continue enjoying benefits."
                            />
                        </div>

                        <div className="text-end">
                            <button className="btn text-white px-4 poppins-semibold" style={{ background: "#399c41" }}>
                                Send
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* TABLE CARD */}



            <div className="card shadow-sm mt-5">
                <div className="card-body">
                    <h5 className="poppins-bold text-color">Notification / View / Delete</h5>

                    <div className="row g-3 mb-3">

                        <div className="col-md-4">
                            <label className="poppins-regular">Type</label>
                            <input className="form-control poppins-regular text-muted mt-2" placeholder="Search" />
                        </div>

                        <div className="col-md-4">
                            <label className="poppins-regular">From Date</label>
                            <input type="date" className="form-control poppins-regular text-muted mt-2" />
                        </div>

                        <div className="col-md-4">
                            <label className="poppins-regular">To Date</label>
                            <input type="date" className="form-control poppins-regular text-muted mt-2" />
                        </div>

                    </div>

                    <table className="table table-bordered align-middle poppins-medium text-center">

                        <thead className="custom-table-head">
                            <tr>
                                <th>S.no</th>
                                <th>Users</th>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Message</th>
                                <th>Date & Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {rows.map(x => (
                                <tr key={x.id}>

                                    <td>{x.id}</td>
                                    <td>{x.users}</td>
                                    <td>{x.type}</td>

                                    <td>{x.title}</td>
                                    <td>{x.msg}</td>

                                    <td className="text-center">
                                        {x.date}<br />
                                        <small className="text-muted">{x.time}</small>
                                    </td>

                                    <td className="text-center">
                                        <MdDelete size={18} className="text-muted" />
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            </div>

        </div>
    );
}
