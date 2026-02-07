import { useState } from "react";
import loginimg from '../assets/img/loginimg.png'; 
import { Link } from "react-router-dom";
import { useLoginMutation } from "../Redux/Api/Api";

const Login = () => {
  const [showForgot, setShowForgot] = useState(false);
  const [loginapi] = useLoginMutation();    
  const loginfun = () => 
  {
   const data = {
    email:"nandhu.105.nandhu@gmail.com",
    password:"karope"
   }
   console.log("login data",data);

       loginapi(data).unwrap()
       .then((res)=>
       {
          console.log("login api response",res);
       })
       .catch((err)=>
       {
          console.log("login api error",err);
       })
  }

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
                    className="form-control shadow-none poppins-light"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label poppins-regular">Password</label>
                  <input
                    type="password"
                    className="form-control shadow-none poppins-light"
                    placeholder="Enter your password"
                  />
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
                    backgroundColor:"#399C41",
                  }} onClick={loginfun}>
                  Login
                </button> 
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE (optional space like reference) */}
          <div className="col-lg-7 d-none d-lg-block text-center">
           <img src={loginimg} alt="Login Illustration" className="img-fluid"/>
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
                    backgroundColor:"#399C41"}}
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
