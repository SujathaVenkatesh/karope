import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

// API hooks
import {
  useBannerQuery,
  useBannerupdateMutation,
  useBannerdeleteMutation,
  useBannerpostupdateMutation,
} from "../Redux/Api/Api";

const Banner = () => {
  // ===== ADD FORM STATES =====
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // ===== POPUP STATES =====
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  // ===== API =====
  const { data: banners = [], refetch } = useBannerQuery();
  const [addBanner] = useBannerpostupdateMutation();
  const [updateBanner] = useBannerupdateMutation();
  const [deleteBanner] = useBannerdeleteMutation();

  // ===== ADD =====
  const handleAdd = async () => {
    if (!title) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    await addBanner(formData);
    refetch();

    setTitle("");
    setDescription("");
    setImage(null);
  };

  // ===== DELETE =====
  const confirmDelete = async () => {
    await deleteBanner({ id: selectedBanner.id });
    refetch();
    setShowDelete(false);
    setSelectedBanner(null);
  };

  // ===== EDIT =====
  const confirmEdit = async () => {
    const formData = new FormData();
    formData.append("title", selectedBanner.title);
    formData.append("description", selectedBanner.description);
    if (selectedBanner.newImage)
      formData.append("image", selectedBanner.newImage);

    await updateBanner({
      id: selectedBanner.id,
      payload: formData,
    });

    refetch();
    setShowEdit(false);
    setSelectedBanner(null);
  };

  return (
    <div className="container-fluid">
      {/* HEADER */}
      <div className="mb-4">
        <h4 className="poppins-bold text-color">Banner Settings</h4>
        <p className="poppins-regular text-muted">
          Configure Promotional Banners by Adding a Title, Description, and Image to Display in the App.
        </p>
      </div>

      {/* ADD FORM */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-lg-6">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-lg-6">
              <label className="form-label">Description</label>
              <input
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-lg-6">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button
              className="btn text-white"
              style={{ background: "#399c41" }}
              onClick={handleAdd}
            >
              + Add
            </button>
          </div>
        </div>
      </div>

      {/* BANNER LIST */}
      <div className="d-flex flex-wrap gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="card shadow-sm mb-4">
            <div className="card-body">
              <div
                className="border border-success rounded p-4 text-center"
                style={{ width: "260px", background: "#eef8ec" }}
              >
                <div className="d-flex justify-content-between mb-2">
                  <MdDelete
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedBanner(banner);
                      setShowDelete(true);
                    }}
                  />
                  <MdEdit
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedBanner({ ...banner });
                      setShowEdit(true);
                    }}
                  />
                </div>

                {banner.image && (
                  <img src={banner.image} alt="" width="50" />
                )}

                <h6>{banner.title}</h6>
                <small>{banner.description}</small>

                <div className="mt-2" style={{ color: "#399c41" }}>
                  {banner.active ? "Active" : "Inactive"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

{/* DELETE MODAL */}
<div
  className={`modal fade ${showDelete ? "show d-block" : ""}`}
  tabIndex="-1"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">

      {/* HEADER */}
      <div className="modal-header modal-header-green bg-danger text-white">
        <h5 className="modal-title poppins-bold">Delete Banner</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={() => setShowDelete(false)}
        ></button>
      </div>

      {/* BODY */}
      <div className="modal-body poppins-regular">
        Are you sure you want to delete?
      </div>

      {/* FOOTER */}
      <div className="modal-footer">
        <button
          className="btn btn-secondary poppins-semibold"
          onClick={() => setShowDelete(false)}
        >
          Cancel
        </button>
        <button className="btn btn-danger poppins-semi-bold" onClick={confirmDelete}>
          Delete
        </button>
      </div>

    </div>
  </div>
</div>

{/* BACKDROP */}
{showDelete && <div className="modal-backdrop fade show"></div>}


{/* EDIT MODAL */}
{showEdit && selectedBanner && (
  <>
    <div
      className="modal fade show d-block"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* HEADER */}
          <div
            className="modal-header text-white"
            style={{ backgroundColor: "#399c41" }}
          >
            <h5 className="modal-title poppins-bold">Edit Banner</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowEdit(false)}
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label poppins-regular">Title</label>
              <input
                className="form-control"
                value={selectedBanner.title}
                onChange={(e) =>
                  setSelectedBanner({
                    ...selectedBanner,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label poppins-regular">Description</label>
              <input
                className="form-control"
                value={selectedBanner.description}
                onChange={(e) =>
                  setSelectedBanner({
                    ...selectedBanner,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label poppins-regular">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  setSelectedBanner({
                    ...selectedBanner,
                    newImage: e.target.files[0],
                  })
                }
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
              className="btn btn-secondary poppins-semibold"
              onClick={() => setShowEdit(false)}
            >
              Cancel
            </button>
            <button
              className="btn text-white poppins-semibold"
              onClick={confirmEdit}
              style={{ backgroundColor: "#399c41" }}
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>

    {/* BACKDROP */}
    <div className="modal-backdrop fade show"></div>
  </>
)}


    </div>
  );
};

export default Banner;
