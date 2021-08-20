import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropsTypes from "prop-types";

import { login } from "../../redux/actions/authAction";
import { clearErrors } from "../../redux/actions/errorAction";

function Login() {
  const initialState = {
    username: "",
    password: "",
    msg: null,
  };

  const [{ username, password, msg }, setState] = useState(initialState);

  const error = useSelector((state) => state.error);

  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error !== ref.error) {
      if (error.id === "LOGIN_FAIL") {
        setState({ msg: error.msg });
      } else {
        setState({ msg: null });
      }
    }
  }, [error]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username,
      password,
    };

    if (msg) {
      dispatch(clearErrors());
    }

    dispatch(login(data));
  };

  return (
    <div className="form-wrapper bg-white">
      <form className="form-layout" onSubmit={handleSubmit}>
        <div className="py-4 pt-md-5">
          <Link className="gouni-report-logo" to="#">
            <img
              src="../assets/images/logo.png"
              alt=""
              className="mr-2"
              width="50"
            />
            <span
              className="font-weight-bolder align-self-center text-primary"
              style={{ fontSize: "20px" }}
            >
              Gouni Report
            </span>
          </Link>
        </div>
        <div className="card-layout">
          <h1 className="font-weight-bold text-dark">Login</h1>
          <p className="mb-4 text-dark">Login to Gouni Report</p>
          {msg ? (
            <div className="alert alert-danger" role="alert">
              <p>{msg}</p>
            </div>
          ) : null}
          <div className="form-label-group">
            <input
              type="username"
              name="username"
              className="form-control"
              placeholder="Username"
              required
              value={username || ""}
              onChange={handleChange}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-label-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required
              value={password || ""}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            className="btn btn-lg btn-primary btn-block rounded-pill mt-4"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <footer className="footer">
        <small className="text-dark">© 2021 Gouni Report</small>
      </footer>
    </div>
  );
}

Login.propsTypes = {
  authorize: PropsTypes.bool,
  error: PropsTypes.object.isRequired,
  login: PropsTypes.func.isRequired,
  clearErrors: PropsTypes.func.isRequired,
};

export default Login;
