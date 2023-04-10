import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./ForgotPassword.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assests/gaming.ebaf2ffc84f4451d.jpg";
import logo from "../../assests/logo.png";

export default function ForgotPassword() {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingRest, setisLoadingRest] = useState(false);
  const [messageError, setmessageError] = useState("");
  const [successCode, setsuccessCode] = useState("");

  async function handelForgotPassword(values) {
    setisLoading(true);
    let { data } = await axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,
        values
      )
      .catch((err) => {
        setisLoading(false);
        setmessageError(
          `${err.response.data.message}`
        );
      });
     
    if (data.statusMsg === "success") {
      // localStorage.setItem("userToken", data.token);
       setsuccessCode(
        `${data.message}`
       )
      setisLoading(false);
      // navigate("/verifydaResetCode");
    }
  }
  async function handelVerifyResetCode(values) {
    setisLoadingRest(true);
    let { data } = await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`, values)
      .catch((err) => {
        setisLoadingRest(false);
        setmessageError(
          `Not Vaild Code`
        );
      });
      console.log(data.status);
    if (data.status === "Success") {
      // localStorage.setItem("userToken", data.token);
      setisLoadingRest(false);
      navigate("/resetPassword");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handelForgotPassword,
  });
  let formik2 = useFormik({
    initialValues: {
      resetCode: "",
    },
  
    onSubmit: handelVerifyResetCode,
  });
  return (
    <>
      <div className="container pt-5 mt-5">
        <div className="row  gx-0">
          <div className="col-md-6">
            <img src={image} alt="" className="w-100 h-100" />
          </div>
          <div className="col-md-6 bg-main-light p-5 text-center ">
            <div className="text-center">
              <img src={logo} alt="" className="w-25 p-2 text-center" />
              <h3 className="text-center text-main mb-3 fs-4">
                Forgot Password
              </h3>
            </div>
            {messageError ? (
              <div className="alert alert-danger">{messageError}</div>
            ) : null}
            {successCode ? (
            <div className="alert alert-success">{successCode}</div>
            ) : null}
            <form onSubmit={formik.handleSubmit}>
              <input
                className="form-control mb-2"
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger">{formik.errors.email}</div>
              ) : null}

              {!isLoading ? (
                
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="btn btn-outline-dark bg-btn-light  w-100 text-white "
                  >
                    Send To Get Verify Reset Code
                  </button>
              ) : (
                <button className="btn bg-main text-white">
                 Loading...
                </button>
              )}
            </form>

            <form onSubmit={formik2.handleSubmit} className="mt-3">
              <input
                className="form-control mb-2"
                onChange={formik2.handleChange}
                value={formik.values.resetCode}
                type="text"
                name="resetCode"
                id="resetCode"
                placeholder="Reset Code"
                onBlur={formik2.handleBlur}
                required
              />
              {!isLoadingRest ? (
                <button
                  disabled={!(formik2.isValid && formik2.dirty)}
                  type="submit"
                  className="btn btn-outline-dark bg-btn-light  w-100 text-white "
                >
                  Send
                </button>
              ) : (
                <button className="btn bg-main text-white">Loading...</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
