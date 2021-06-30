import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/user/userAction";
import logo from "../../../assets/logo.png";
import styled from "styled-components";
import profile from "../../../assets/profile.svg";
import Darkmode from "../../atom/Darkmode";

const Header = () => {
  const NewHeader = styled.div``;
  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  return (
    <>
      <div className="container-fluid navbar-light bg-white">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <div
              onClick={() => {
                history.push("/");
              }}
              className="navbar-brand navname"
            >
              <img className="" src={logo} alt="" />
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav navtext">
                <li>
                  <Link
                    onClick={() => {
                      history.push("/news");
                    }}
                    className="nav-link active"
                    aria-current="page"
                  >
                    News
                  </Link>
                </li>

                {accessToken ? (
                  <>
                    <div className="dropdown ml-3">
                      <i
                        className="icon-nav nav-userlink text-dark"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              history.push("/profile");
                            }}
                            className="nav-link active"
                            aria-current="page"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(logoutUser());
                              history.push("/login");
                            }}
                            className="nav-link active"
                            aria-current="page"
                          >
                            Logout
                          </Link>
                        </li>
                        <li>
                          <Darkmode />
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        onClick={() => {
                          history.push("/login");
                        }}
                        className="nav-link active"
                        aria-current="page"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          history.push("/register");
                        }}
                        className="nav-link active"
                        aria-current="page"
                      >
                        Register
                      </Link>
                    </li>
                    <li>
                      <Darkmode />
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
