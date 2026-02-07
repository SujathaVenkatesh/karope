import { useState } from "react";
import loginimg from '../assets/img/loginimg.png';
import { Link } from "react-router-dom";
import { useLoginMutation } from "../Redux/Api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useUser from "../Redux/Local/userDetail";
import useToken from "../Redux/Local/userToken";

const FieldError = ({ message }) =>
  message ? (
    <small className="text-danger d-block mt-1 ps-2">{message}</small>
  ) : null;

const required =
  (msg = "Required") =>
  (v) =>
    !v || (typeof v === "string" && v.trim() === "") ? msg : "";

const emailRule =
  (msg = "Enter a valid email") =>
  (v) => {
    if (!v) return "Required";
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    return ok ? "" : msg;
  };

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();
  const { setToken } = useToken();
  const navigate = useNavigate();

  const [loginApi] = useLoginMutation();
  // const [forgotPassword] = useForgotPasswordMutation();
  // const [otpPassword] = useOtpPasswordMutation();
  // const [newPassword] = useNewPasswordMutation();

  const validators = {
    email: [required("Email is required"), emailRule()],
    password: [required("Password is required")],
  };

  const validateField = (name, value) => {
    const rules = validators[name] || [];
    for (const rule of rules) {
      const err = rule(value);
      if (err) return err;
    }
    return "";
  };

  const validateForm = () => {
    const nextErrors = {};
    Object.keys(validators).forEach((key) => {
      const val = form[key];
      const err = validateField(key, val);
      if (err) nextErrors[key] = err;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const setEmail = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, email: value }));
    if (errors.email)
      setErrors((prev) => ({ ...prev, email: validateField("email", value) }));
  };

  const setPassword = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, password: value }));
    if (errors.password)
      setErrors((prev) => ({
        ...prev,
        password: validateField("password", value),
      }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    loginApi(form)
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Login successful");
        console.log("Login response:", res);
        setUser(res);
        setToken(res?.token);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err?.data?.message || "BAD_REQUEST");
      })
      .finally(() => setLoading(false));
  };

  // =======================
  // FORGOT PASSWORD POPUP
  // =======================

  const [showForgot, setShowForgot] = useState(false);
  const [fpStep, setFpStep] = useState(1);

  const [fpForm, setFpForm] = useState({
    email: "",
    otp: "",
    otpRequestId: "",
    resetToken: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [fpErrors, setFpErrors] = useState({});
  const [fpStatus, setFpStatus] = useState({ type: "", message: "" });

  // STEP 1 → Validate Email
  const validateFpStep1 = () => {
    const e = {};
    if (!fpForm.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(fpForm.email))
      e.email = "Enter valid email";

    setFpErrors(e);
    return Object.keys(e).length === 0;
  };

  // STEP 2 → Verify OTP
  const validateFpStep2 = () => {
    const e = {};
    if (!fpForm.otp.trim()) e.otp = "OTP required";
    else if (!/^\d{6}$/.test(fpForm.otp)) e.otp = "Enter 6-digit OTP";

    setFpErrors(e);
    return Object.keys(e).length === 0;
  };

  // STEP 3 → New Password
  const validateFpStep3 = () => {
    const e = {};
    if (!fpForm.newPassword || fpForm.newPassword.length < 8)
      e.newPassword = "Min 8 characters";
    if (fpForm.newPassword !== fpForm.confirmNewPassword)
      e.confirmNewPassword = "Passwords do not match";

    setFpErrors(e);
    return Object.keys(e).length === 0;
  };


  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        background:
          "linear-gradient(120deg, #dfeee0 0%, #cfe6d2 50%, #dfeee0 100%)",
      }}
    >
      <div className="container">
        <div className="row align-items-center">

          {/* LEFT CARD */}
          <div className="col-lg-5">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              <div className="card-body">

                <h3 className="poppins-bold text-color text-center">Login</h3>
                <p className="text-muted mb-4 text-center poppins-regular">
                  Access your Admin dashboard
                </p>

                <div className="mb-3">
                  <label className="form-label poppins-regular">Email address</label>
                  <input
                    type="email"
                    disabled={loading}
                    value={form.email}
                    onChange={setEmail}
                    className="form-control shadow-none poppins-light"
                    placeholder="Enter your email"
                  />
                  <FieldError message={errors.email} />
                </div>
                

                <div className="mb-2">
                  <label className="form-label poppins-regular">Password</label>
                  <input
                    type="password"
                    disabled={loading}
                    value={form.password}
                    onChange={setPassword}
                    className="form-control shadow-none poppins-light"
                    placeholder="Enter your password"
                  />
                  <FieldError message={errors.password} />
                </div>

                <div className="text-end mb-3">
                  <button
                    className="btn text-color text-decoration-none p-0 poppins-light"
                    onClick={() => setShowForgot(true)}
                  >
                    Forgot password?
                  </button>
                </div>

                <button className="btn w-100 py-2 poppins-semibold text-white" style={{
                  backgroundColor: "#399C41",
                }}  onClick={handleLogin}
                disabled={loading}>
                  Login
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE (optional space like reference) */}
          <div className="col-lg-7 d-none d-lg-block text-center">
            <img src={loginimg} alt="Login Illustration" className="img-fluid" />
          </div>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}

      {showForgot && (
        <>
          {/* BLUR OVERLAY */}
          <div
            className="blur-overlay"
            onClick={() => setShowForgot(false)}
          ></div>

          {/* MODAL */}
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header border-0">
                  <h4 className="modal-title poppins-bold text-color">Forgot Password</h4>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowForgot(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-4">
                    <label className="form-label poppins-regular">Email</label>
                    <input
                      type="email"
                      className="form-control shadow-none poppins-light"
                      placeholder="Enter your email"
                    />
                  </div>

                  <button
                    className="btn w-100 py-2 text-white poppins-semibold"
                    style={{
                      backgroundColor: "#399C41"
                    }}
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default Login;
