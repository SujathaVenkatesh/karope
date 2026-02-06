import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const Banner = () => {
    // form states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    // multiple banners
    const [banners, setBanners] = useState([]);

    const handleAdd = () => {
        if (!title) return;

        setBanners([
            ...banners,
            {
                id: Date.now(),
                title,
                description,
                image,
                active: true,
            },
        ]);

        // clear input fields
        setTitle("");
        setDescription("");
        setImage(null);
    };

    const handleDelete = (id) => {
        setBanners(banners.filter((b) => b.id !== id));
    };

    const toggleStatus = (id) => {
        setBanners(
            banners.map((b) =>
                b.id === id ? { ...b, active: !b.active } : b
            )
        );
    };

    return (
        <div className="container-fluid">
            {/* BANNER SETTINGS */}
            <div className="mb-4">
              <h4 className="poppins-bold text-color">
                        Banner Settings
                    </h4>
                    <p className="poppins-regular text-muted">Configure Promotional Banners by Adding a Title, Description, and Image to Display in the App.</p>
            </div>
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                   

                    <div className="row g-3">
                        <div className="col-lg-6">
                            <label className="form-label poppins-regular">Title</label>
                            <input
                                className="form-control poppins-regular"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter Title"
                            />
                        </div>

                        <div className="col-lg-6">
                            <label className="form-label poppins-regular">
                                Description
                            </label>
                            <input
                                className="form-control poppins-regular text-muted"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                placeholder="Enter Description"
                            />
                        </div>

                        <div className="col-lg-6">
                            <label className="form-label poppins-regular">
                                Image
                            </label>
                            <input
                                type="file"
                                className="form-control poppins-regular text-muted"
                                accept="image/*"
                                onChange={(e) =>
                                    setImage(
                                        URL.createObjectURL(e.target.files[0])
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                        <button
                            className="btn text-white px-4 poppins-semibold"
                            style={{ background: "#399c41" }}
                            onClick={handleAdd}
                        >
                           + Add
                        </button>
                    </div>
                </div>
            </div>

            {/* BANNER CARDS */}
             
                   
            <div className="d-flex flex-wrap gap-4">
                {banners.map((banner) => (
                    <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div
                        key={banner.id}
                        className="border border-success rounded p-4 text-center"
                        style={{
                            width: "260px",
                            background: "#eef8ec",
                        }}
                    >
                        <div className="d-flex justify-content-between mb-2">
                            <MdDelete
                                size={18}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDelete(banner.id)}
                            />
                            <MdEdit size={18} />
                        </div>

                        {banner.image && (
                            <img
                                src={banner.image}
                                alt="banner"
                                className="mb-2"
                                style={{ width: "50px" }}
                            />
                        )}

                        <h6 className="poppins-bold mb-1">
                            {banner.title}
                        </h6>

                        <small
                            className="text-muted d-block mb-2 poppins-regular"
                            style={{
                                wordBreak: "break-word",
                                overflowWrap: "anywhere",
                                whiteSpace: "normal",
                            }}
                        >
                            {banner.description}
                        </small>


                        <div
                            className="poppins-semibold mb-2"
                            style={{ color: "#399c41" }}
                        >
                            {banner.active ? "Active" : "Inactive"}
                        </div>

                        <div className="form-check form-switch d-flex justify-content-center">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={banner.active}
                                onChange={() => toggleStatus(banner.id)}
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: banner.active ? "#399c41" : "#ccc",
                                    borderColor: banner.active ? "#399c41" : "#ccc",
                                }}
                            />

                        </div>
                    </div>
                </div>
            </div>
                ))}
                </div>
                </div>
              
        
                
    );
};

export default Banner;
