import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Register.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assests/gaming.ebaf2ffc84f4451d.jpg";

export default function Register() {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [messageError, setmessageError] = useState("");

  async function handelregister(values) {
    setisloading(true);
    let { data } = await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisloading(false);
        setmessageError(`${err.response.data.message}`);
      });
    if (data.message === "success") {
       setisloading(false);
      navigate("/login");
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name minlength is 3")
      .max(10, "name maxlength is 10"),
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with uppercase and length 5 to 8 letter or number"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "password and repassword doesnt match"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "phone must be egyption number"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handelregister,
  });
  return (
    <>
      <div className="container pt-5 mt-5">
        <div className="row  gx-0">
          <div className="col-md-6">
            <img src={image} alt="" className="w-100 h-100" />
          </div>
          <div className="col-md-6 bg-main-light p-3">
            <h3 className="text-center text-main mb-3">Create My Account! </h3>
            {messageError ? (
              <div className="alert alert-danger">{messageError}</div>
            ) : null}
            <form onSubmit={formik.handleSubmit}>
              <input
                className="form-control mb-2 bg-dark text-white"
                onChange={formik.handleChange}
                value={formik.values.name}
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="alert alert-danger">{formik.errors.name}</div>
              ) : null}

              <input
                className="form-control mb-2 bg-dark text-white"
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
                className="form-control mb-2 bg-dark text-white"
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="alert alert-danger">
                  {formik.errors.password}
                </div>
              ) : null}

              <input
                className="form-control mb-2 bg-dark text-white"
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                type="password"
                name="rePassword"
                id="rePassword"
                placeholder="Repassword"
                onBlur={formik.handleBlur}
              />
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div className="alert alert-danger">
                  {formik.errors.rePassword}
                </div>
              ) : null}

              <input
                className="form-control mb-2 bg-dark text-white"
                onChange={formik.handleChange}
                value={formik.values.phone}
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone"
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="alert alert-danger">{formik.errors.phone}</div>
              ) : null}
              {!isloading ? (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="btn btn-outline-dark bg-btn-light  w-100 text-white "
                >
                  Creat Account
                </button>
              ) : (
                <button className="btn bg-main text-white">
                  Loading...
                </button>
              )}
              <div className="text-muted small text-center">
                This site is protected by reCAPTCHA and the Google
                <Link
                  to="https://policies.google.com/privacy"
                  className="text-secondary "
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  to="https://policies.google.com/terms"
                  className="text-secondary"
                >
                  Terms of Service
                </Link>{" "}
                apply.
              </div>
             
              <div className="text-main text-center font-sm">
                Already a member?
                <Link
                  className="nav-link py-1 px-2 text-blue d-inline"
                  to="/login"
                >
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
