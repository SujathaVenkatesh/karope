import { useState, useEffect, useRef } from "react";
import {
    FaMobileAlt, FaBolt, FaPlane, FaFilm, FaBus, FaWallet,
    FaExchangeAlt, FaPhoneAlt, FaWifi, FaFire,
    FaFileInvoice, FaThLarge
} from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

import {
    useMenulistgetQuery,
    useMenudetailviewQuery,
    useMenupdateMutation,
    useMenudeleteMutation,
    useMenuactiveMutation,
    useMenudeactiveMutation,
    useMenupostupdateMutation
} from "../Redux/Api/Api";


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
    More: <FaThLarge size={22} color="#399c41" />,
};

const Menu = () => {
    /* API */
    const { data, refetch } = useMenulistgetQuery();
    const [menupdate] = useMenupdateMutation();
    const [menudelete] = useMenudeleteMutation();
    const [menuactive] = useMenuactiveMutation();
    const [menudeactive] = useMenudeactiveMutation();
    const [menupostupdate] = useMenupostupdateMutation();

    /* State */
    const [menus, setMenus] = useState([]);
    const [menuName, setMenuName] = useState("");
    const [menuIcon, setMenuIcon] = useState(null);
    const [status, setStatus] = useState(true);

    const [editId, setEditId] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selected, setSelected] = useState(null);

    const fileInputRef = useRef(null);


    /* Load menu list */
    useEffect(() => {
        if (data?.length) {
            setMenus(
                data.map(item => ({
                    id: item.id,
                    name: item.name,
                    active: item.is_active === true ||
                        item.is_active === 1 ||
                        item.is_active === "true" ||
                        item.status === true ||
                        item.status === 1 ||
                        item.status === "true",
                    icon: item.image_url
                        ? `http://localhost:3000${item.image_url}`
                        : null,
                }))
            );
        }
    }, [data]);

    /* ADD */
    const handleAdd = async () => {
        if (!menuName) return alert("Enter menu name");
        if (!menuIcon) return alert("Menu Icon is required");

        const formData = new FormData();
        formData.append("name", menuName);
        formData.append("status", status);
        if (menuIcon) formData.append("image", menuIcon);

        await menupostupdate(formData).unwrap();
        resetForm();
        refetch();
    };

    /* UPDATE */
    const handleUpdate = async () => {
        if (!menuName) return alert("Enter menu name");

        const formData = new FormData();
        formData.append("name", menuName);
        formData.append("status", status);
        if (menuIcon) formData.append("image", menuIcon);

        await menupdate({ id: editId, payload: formData }).unwrap();
        setShowEdit(false);
        resetForm();
        refetch();
    };

    /* TOGGLE */
    const toggle = async m => {
        if (m.active) {
            await menudeactive({ id: m.id }).unwrap();
        } else {
            await menuactive({ id: m.id }).unwrap();
        }
        refetch();
    };

    const resetForm = () => {
        setMenuName("");
        setMenuIcon(null);
        setStatus(true);
        setEditId(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="container-fluid">

            {/* Header */}
            <div className="mb-4">
                <h4 className="poppins-bold text-color">Add Menu</h4>
                <p className="poppins-regular text-muted mb-0"> Configure and Toggle Platform Services for End-Users </p>
            </div>

            {/* ADD FORM */}

            <div className="card shadow-sm mb-4">
                <div className="card-body row g-3 align-items-end">

                    <div className="col-md-4 poppins-regular ">
                        <label>Menu Name</label>
                        <input
                            className="form-control mt-2"
                            value={menuName}
                            onChange={e => setMenuName(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4 poppins-regular">
                        <label>Icon</label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="form-control mt-2 "
                            onChange={e => setMenuIcon(e.target.files[0])}
                        />
                    </div>

                    <div className="col-md-3 poppins-regular">
                        <label>Status</label>
                        <div className="btn-group w-100 mt-2 ">
                            <button
                                className="btn text-white poppins-semibold"
                                style={{ background: status ? "#399c41" : "#ccc" }}
                                onClick={() => setStatus(true)}
                            >
                                Active
                            </button>
                            <button
                                className="btn text-white poppins-semibold"
                                style={{ background: !status ? "#399c41" : "#ccc" }}
                                onClick={() => setStatus(false)}
                            >
                                Inactive
                            </button>
                        </div>
                    </div>

                    <div className="col-md-1">
                        <button
                            className="btn text-white w-100 poppins-semibold"
                            style={{ background: "#399c41" }}
                            onClick={handleAdd}
                        >
                            + Add
                        </button>
                    </div>

                </div>
            </div>

            {/* MENU LIST */}
            <div className="card shadow-sm bg-white mt-5">
                <div className="card-body">
                    <div className="row g-3">
                        <h4 className="poppins-bold text-color ">Menu</h4>

{menus.length > 0 ? (
  menus.map(m => (
    <div key={m.id} className="col-xl-2 col-md-3 col-sm-4">
      <div
        className="card text-center h-100"
        style={{ background: "#eaf6ea", border: "1px solid #399c41" }}
      >
        <div className="card-body">

          <div className="d-flex justify-content-between">
            <MdDelete
              onClick={() => { setSelected(m); setShowDelete(true); }}
            />
            <MdEdit
              onClick={() => {
                setEditId(m.id);
                setMenuName(m.name);
                setStatus(m.active);
                setMenuIcon(null);
                setShowEdit(true);
              }}
            />
          </div>

          <div className="my-2">
            {m.icon
              ? <img src={m.icon} width="22" alt={m.name} />
              : defaultIcons[m.name] || <FaThLarge />}
          </div>

          <b className="poppins-semibold">{m.name}</b>

          <div className="form-check form-switch d-flex justify-content-center mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={m.active}
              onChange={() => toggle(m)}
              style={{
                backgroundColor: m.active ? "#399c41" : "#ccc"
              }}
            />
          </div>

        </div>
      </div>
    </div>
  ))
) : (
  <div className="col-12 text-center py-5">
    <h6 className="text-muted poppins-semibold">
      No Menu Found
    </h6>
  </div>
)}

                    </div>

                    {/* EDIT MODAL */}
                    {showEdit && (
                        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.6)" }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header text-white" style={{ backgroundColor: "#399c41" }}>
                                        <h5 className="poppins-bold">Edit Menu</h5>
                                        <button className="btn-close" onClick={() => setShowEdit(false)} />
                                    </div>

                                    <div className="modal-body">
                                    <label className="poppins-regular">Menu Name</label>
                                        <input
                                            className="form-control poppins-regular mt-2"
                                            value={menuName}
                                            onChange={e => setMenuName(e.target.value)}

                                        />
                                        {/* Image update */}
                                        <div>
                                         <label className="poppins-regular mt-3">Icon</label>
                                            <input
                                                type="file"
                                                className="form-control poppins-regular mt-2"
                                                onChange={e => setMenuIcon(e.target.files[0])}
                                            />
                                        </div>
                                    </div>


                                    <div className="modal-footer">
                                        <button className="btn btn-secondary poppins-semibold" onClick={() => setShowEdit(false)}>
                                            Cancel
                                        </button>
                                        <button className="btn text-white poppins-semibold" onClick={handleUpdate} style={{ backgroundColor: "#399c41" }}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DELETE MODAL */}
                    {showDelete && (
                        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.6)" }}>
                            <div className="modal-dialog modal-dialog-centered ">
                                <div className="modal-content">
                                    <div className="modal-header bg-danger text-white">
                                        <h5 className="poppins-bold">Delete Menu</h5>

                                        <button className="btn-close" onClick={() => setShowDelete(false)} />
                                    </div>

                                    <div className="modal-body poppins-regular">
                                        Are you sure you want to delete?
                                    </div>

                                    <div className="modal-footer">


                                        <button className="btn btn-secondary poppins-semibold" onClick={() => setShowDelete(false)}>
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-danger poppins-semibold"
                                            onClick={async () => {
                                                await menudelete({ id: selected.id }).unwrap();
                                                setShowDelete(false);
                                                refetch();
                                            }}
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>

                    )}

                </div>
            </div>
        </div>
    );
};

export default Menu;


