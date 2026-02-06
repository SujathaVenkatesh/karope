import { useState } from "react";

const Settings = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [account, setAccount] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const [setting, setSetting] = useState({
    email: "",
    password: "",
    new: null,
  });

  const handleSave = () => {
   
    console.log("Account:", account);
    console.log("Settings:", setting);
    // console.log("Banner:", banner);

    setIsEdit(false);
  };

  return (
    <div className="container-fluid">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h4 className="poppins-bold text-color">Settings</h4>
        <p className="text-muted mb-0 poppins-regular">
          Manage your Account Credentials and Recharge Business Logic.
        </p>
      </div>

      {/* ACCOUNT SETTINGS */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="poppins-bold text-color mb-3">
            Account Settings
          </h5>

          <div className="row g-3">
            <div className="col-lg-6">
              <label className="form-label poppins-regular">Email ID</label>
              <input
                type="email"
                className="form-control poppins-regular"
                disabled={!isEdit}
                value={account.email}
                placeholder="Enter EmailId"
                onChange={(e) =>
                  setAccount({ ...account, email: e.target.value })
                }
              />
            </div>

            <div className="col-lg-6">
              <label className="form-label poppins-regular">Current Password</label>
              <input
                type="password"
                className="form-control poppins-regular"
                disabled={!isEdit}
                placeholder="Enter Password"
                value={account.currentPassword}
                onChange={(e) =>
                  setAccount({ ...account, currentPassword: e.target.value })
                }
              />
            </div>

            <div className="col-lg-6">
              <label className="form-label poppins-regular">New Password</label>
              <input
                type="password"
                className="form-control poppins-regular"
                disabled={!isEdit}
                placeholder="Enter New Password"
                value={account.newPassword}
                onChange={(e) =>
                  setAccount({ ...account, newPassword: e.target.value })
                }
              />
            </div>
          </div>
        

       {/* ACTION BUTTONS */}
      <div className="d-flex justify-content-end gap-2">
        {!isEdit ? (
          <button
            className="btn px-4 poppins-semibold text-white" style={{ backgroundColor: "#399C41" }}
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        ) : (
          <>
            <button
              className="btn btn-secondary px-4 poppins-semibold"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-success px-4 poppins-semibold" style={{ backgroundColor: "#399C41" }}
              onClick={handleSave}
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
    </div>
      </div>
  );
};

export default Settings;
