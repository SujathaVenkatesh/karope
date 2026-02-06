import { useState } from "react";
import {
    FaMobileAlt, FaBolt, FaPlane, FaFilm, FaBus, FaWallet,
    FaExchangeAlt, FaPhoneAlt, FaWifi, FaFire, FaFileInvoice, FaThLarge
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const defaultIcons = {
    Recharge: <FaMobileAlt size={22} color="#399c41" />,
    Electricity: <FaBolt size={22} color="#399c41" />,
    Flight: <FaPlane size={22} color="#399c41" />,
    Movie: <FaFilm size={22} color="#399c41" />,
    Bus: <FaBus size={22} color="#399c41" />,
    Payments: <FaWallet size={22} color="#399c41" />,
    Transfer: <FaExchangeAlt size={22} color="#399c41" />,
    Landline: <FaPhoneAlt size={22} color="#399c41" />,
    Broadband: <FaWifi size={22} color="#399c41" />,
    Gas: <FaFire size={22} color="#399c41" />,
    Bills: <FaFileInvoice size={22} color="#399c41" />,
    More: <FaThLarge size={22} color="#399c41" />
};

export default function Menu() {

    const initial = [
        "Recharge", "Electricity", "Flight", "Movie", "Bus", "Payments",
        "Transfer", "Landline", "Broadband", "Gas", "Bills", "More"
    ].map((x, i) => ({
        id: i,
        name: x,
        active: ["Recharge", "Flight", "Movie", "Bus", "Payments", "Broadband", "Gas", "Bills", "More"].includes(x),
        soon: x !== "Recharge",
        icon: null
    }));

    const [menus, setMenus] = useState(initial);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);

    const [menuName, setMenuName] = useState("");
    const [menuIcon, setMenuIcon] = useState(null);
    const [status, setStatus] = useState(true);

    const toggle = id => setMenus(m => m.map(x => x.id === id ? { ...x, active: !x.active } : x));
    const openDelete = item => { setSelected(item); setShow(true) };
    const confirmDelete = () => { setMenus(m => m.filter(x => x.id !== selected.id)); setShow(false) };

    const handleAdd = () => {
        if (!menuName) return alert("Enter menu name");

        setMenus(m => [
            ...m,
            {
                id: Date.now(), name: menuName, active: status, soon: false,
                icon: menuIcon ? URL.createObjectURL(menuIcon) : null
            }
        ]);

        setMenuName("");
        setMenuIcon(null);
    };

    return (
        <div className="container-fluid">

            <div className="mb-4">
                <h4 className="poppins-bold text-color">Add Menu</h4>
                <p className="poppins-regular text-muted mb-0">
                    Configure and Toggle Platform Services for End-Users
                </p>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="row g-3 align-items-end ">

                        <div className="col-md-4">
                            <label className="poppins-regular mb-2">Menu Name</label>
                            <input className="form-control poppins-regular"
                                value={menuName}
                                placeholder="Name"
                                onChange={e => setMenuName(e.target.value)} />
                        </div>

                        <div className="col-md-4">
                            <label className="poppins-regular mb-2">Icon</label>
                            <input type="file" className="form-control poppins-regular text-muted"
                                onChange={e => setMenuIcon(e.target.files[0])} />
                        </div>

                        <div className="col-md-3">
                            <label className="poppins-regular mb-2">Status</label>
                            <div className="btn-group w-100">
                                <button onClick={() => setStatus(true)}
                                    className="btn text-white poppins-semibold"
                                    style={{ background: status ? "#399c41" : "#ccc" }}>Active</button>

                                <button onClick={() => setStatus(false)}
                                    className="btn text-white poppins-semibold"
                                    style={{ background: !status ? "#399c41" : "#ccc" }}>Inactive</button>
                            </div>
                        </div>

                        <div className="col-md-1">
                            <button className="btn text-white w-100 poppins-semibold"
                                style={{ background: "#399c41" }}
                                onClick={handleAdd}>+ Add</button>
                        </div>

                    </div>
                </div>
            </div>


            <div className="card shadow-sm bg-white mt-5">
                <div className="card-body">
                    <div className="row g-3">
                        <h4 className="poppins-bold text-color ">Menu</h4>

                        {menus.map(m => (
                            <div key={m.id} className="col-xl-2 col-md-3 col-sm-4">

                                <div className="card text-center h-100"
                                    style={{ background: "#eaf6ea", border: "1px solid #399c41" }}>

                                    <div className="card-body">

                                        <div className="d-flex justify-content-between">
                                            <MdDelete size={18} className="text-muted" onClick={() => openDelete(m)} />
                                            {m.soon && <span className="badge bg-light text-danger border border-danger poppins-medium">SOON</span>}
                                            <MdEdit size={18} className="text-muted" onClick={() => openEdit(m)} />
                                        </div>

                                        <div className="rounded-circle mx-auto my-2 d-flex align-items-center justify-content-center"
                                            style={{ width: 48, height: 48, background: "#fff", border: "1px solid #399c41" }}>

                                            {m.icon ? <img src={m.icon} width="22" /> : defaultIcons[m.name]}

                                        </div>

                                        <b className="poppins-semibold">{m.name}</b>

                                        <div className={`poppins-regular ${m.active ? "text-color" : "text-muted"}`}>
                                            {m.active ? "Active" : "Inactive"}
                                        </div>

                                        <div className="form-check form-switch d-flex justify-content-center mt-2">
                                            <input className="form-check-input"
                                                type="checkbox"
                                                checked={m.active}
                                                onChange={() => toggle(m.id)}
                                                style={{ backgroundColor: m.active ? "#399c41" : "#ccc" }} />
                                        </div>

                                    </div>
                                </div>



                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {show && (
                <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.4)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="poppins-bold">Delete Menu</h5>
                                <button className="btn-close" onClick={() => setShow(false)}></button>
                            </div>

                            <div className="modal-body poppins-regular">
                                Delete <b>{selected?.name}</b> ?
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary poppins-medium" onClick={() => setShow(false)}>Cancel</button>
                                <button className="btn text-white poppins-semibold" style={{ background: "#399c41" }} onClick={confirmDelete}>Delete</button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
