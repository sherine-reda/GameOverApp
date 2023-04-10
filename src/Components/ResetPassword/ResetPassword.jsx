import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./ResetPassword.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assests/gaming.ebaf2ffc84f4451d.jpg";
import logo from "../../assests/logo.png";

export default function ResetPassword({ saveUserData }) {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setmessageError] = useState("");

  async function handelLogin(values) {
    setisLoading(true);
    let { data } = await axios
      .put(
        `https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,
        values
      )
      .catch((err) => {
        setisLoading(false);
        setmessageError(`${err.response.data.message}`);
      });

    if (data.statusMsg !== "fail") {
      localStorage.setItem("userToken", data.token);
      saveUserData();
      setisLoading(false);
      navigate("/");
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
    newPassword: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with uppercase and length 5 to 8 letter or number"
      ),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handelLogin,
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
                Update Your Password
              </h3>
            </div>
            {messageError ? (
              <div className="alert alert-danger">{messageError}</div>
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

              <input
                className="form-control mb-2"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
                onBlur={formik.handleBlur}
              />
              {formik.errors.newPassword && formik.touched.newPassword ? (
                <div className="alert alert-danger">
                  {formik.errors.newPassword}
                </div>
              ) : null}

              {!isLoading ? (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn btn-outline-dark bg-btn-light  w-100 text-white "
                >
                  Update
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
