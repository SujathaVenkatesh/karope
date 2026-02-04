import { useState } from "react";
import "../Style/user.css";
import vector from '../assets/img/vector.png';

const TABS = [
    "All",
    "Active Recharge",
    "Expired Recharge",
    "No Recharge Users",
];

const usersData = [
    {
        id: 1,
        name: "Rohit",
        mobile: "9123456987",
        operator: "Airtel",
        lastRecharge: "28-01-2026",
        plan: "₹449",
        status: "Active",
        validity: "28-03-2026",
        icon: vector
    },
    {
        id: 2,
        name: "Suriya",
        mobile: "9123456988",
        operator: "Jio",
        lastRecharge: "26-01-2026",
        plan: "₹409",
        status: "Active",
        validity: "26-03-2026",
        icon: vector
    },
    {
        id: 3,
        name: "Rohit",
        mobile: "9123456987",
        operator: "Airtel",
        lastRecharge: "01-01-2026",
        plan: "₹409",
        status: "Expired",
        validity: "01-03-2026",
        icon: vector
    },
    {
        id: 4,
        name: "Rohit",
        mobile: "9123456987",
        operator: "Airtel",
        lastRecharge: null,
        plan: null,
        status: "No Recharge",
        validity: null,
        icon: vector
    },
];

const Users = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const parseDDMMYYYY = (dateStr) => {
        if (!dateStr) return null;
        const [dd, mm, yyyy] = dateStr.split("-");
        return new Date(`${yyyy}-${mm}-${dd}`);
    };


    // ✅ FILTER LOGIC (FIXED)
    const filteredUsers = usersData.filter((u) => {
        if (
            search &&
            !`${u.name}${u.mobile}`.toLowerCase().includes(search.toLowerCase())
        ) {
            return false;
        }

        if (activeTab !== "All") {
            if (activeTab === "Active Recharge" && u.status !== "Active") return false;
            if (activeTab === "Expired Recharge" && u.status !== "Expired") return false;
            if (activeTab === "No Recharge Users" && u.status !== "No Recharge")
                return false;
        }

        if (fromDate && u.lastRecharge) {
            if (parseDDMMYYYY(u.lastRecharge) < new Date(fromDate)) {
                return false;
            }
        }

        if (toDate && u.lastRecharge) {
            if (parseDDMMYYYY(u.lastRecharge) > new Date(toDate)) {
                return false;
            }
        }


        return true;
    });

    //  CSV EXPORT (WORKING)
    const handleExportCSV = () => {
        if (!filteredUsers.length) return;

        const headers = [
            "Name",
            "Mobile",
            "Operator",
            "Last Recharge",
            "Plan",
            "Status",
            "Validity",
        ];

        const rows = filteredUsers.map((u) => [
            u.name,
            u.mobile,
            u.operator,
            u.lastRecharge || "",
            u.plan || "",
            u.status,
            u.validity || "",
        ]);

        const csv =
            headers.join(",") +
            "\n" +
            rows.map((r) => r.join(",")).join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "users.csv";
        link.click();
    };

    return (
        <div className="container-fluid">
            {/* HEADER */}
            <div className="mb-4">
                <h4 className="poppins-bold text-color">Users List</h4>
                <p className="poppins-regular text-muted mb-0">
                    Manage and monitor recharge app users from a dashboard.
                </p>
            </div>

            {/* TABS */}
            <div className="bg-white p-3 rounded shadow-sm d-flex gap-3">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`tab-btn poppins-bold ${activeTab === tab ? "tab-active" : ""
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* CARD */}
            <div className="card shadow-sm bg-white mt-5">
                <div className="card-body">
                    {/* FILTERS */}
                    <div className="row g-3 align-items-end mb-3">
                        <div className="col-lg-3">
                            <label className="form-label poppins-regular">Username</label>
                            <input
                                className="form-control poppins-regular"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-lg-2">
                            <label className="form-label d-block">&nbsp;</label>
                            <button
                                className="btn w-100 poppins-regular text-white" style={{ backgroundColor: "#399c41" }}
                                onClick={handleExportCSV}
                            >
                                Export CSV
                            </button>
                        </div>

                        <div className="col-lg-2"></div>

                        <div className="col-lg-2">
                            <label className="form-label poppins-regular">From Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>

                        <div className="col-lg-2">
                            <label className="form-label poppins-regular">To Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="table-responsive text-center poppins-medium">
                        <table className="table table-bordered align-middle mb-0">
                            <thead className="custom-table-head">
                                <tr>
                                    <th>S.No</th>
                                    <th>User</th>
                                    <th>Operation</th>
                                    <th>Last Recharge</th>
                                    <th>Plan</th>
                                    <th>Status</th>
                                    <th>Validity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map((u, i) => (
                                    <tr key={u.id}>
                                        <td>{i + 1}</td>

                                        <td>
                                            <h6 className="mb-0 poppins-semibold">{u.name}</h6>
                                            <span className="text-muted">{u.mobile}</span>
                                        </td>

                                        <td>{u.operator}</td>
                                        <td>{u.lastRecharge || "None"}</td>
                                        <td>{u.plan || "None"}</td>

                                        <td>
                                            <span
                                                className={`fw-semibold ${u.status === "Active"
                                                        ? "text-success"
                                                        : u.status === "Expired"
                                                            ? "text-danger"
                                                            : "text-muted"
                                                    }`}
                                            >
                                                {u.status}
                                            </span>
                                        </td>

                                        <td>{u.validity || "None"}</td>
                                        <td className="text-center">
                                            <img
                                                src={u.icon}
                                                alt="action"
                                                width={20}
                                                height={15}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </td>

                                    </tr>
                                ))}

                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted py-4">
                                            No users found
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

export default Users;
