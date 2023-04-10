import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assests/logo.png";
import { Link } from "react-router-dom";

export default function Navbar({ userData, logOut }) {
  return (
    <>
      <nav className={`${styles.navbarr} navbar navbar-expand-sm mb-5 fixed-top border-bottom-shadow bg-main w-100`}>
        <div className="container">
          <Link className="navbar-brand w-25 text-white font-nav-logo " to="/">
            <img src={logo} alt="logo" className="w-25" />
            GameOver
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userData !== null ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-main" to="games/all">
                    All
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-main"
                    to="#"
                    id="dropdownId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Platforms
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="dropdownId">
                    <Link className="dropdown-item" to="games/Platforms/pc/pc">
                      pc
                    </Link>
                    <Link className="dropdown-item" to="games/Platforms/browser/browser">
                    browser
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-main"
                    to="#"
                    id="dropdownId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    sort-by 
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="dropdownId">
                    <Link className="dropdown-item" to="games/sort-by/release-date/release-date">
                    release-date
                    </Link>
                    <Link className="dropdown-item" to="games/sort-by/popularity/popularity">
                    popularity
                    </Link>
                    <Link className="dropdown-item" to="games/sort-by/alphabetical/alphabetical">
                    alphabetical
                    </Link>
                    <Link className="dropdown-item" to="games/sort-by/relevance/relevance">
                    relevance
                    </Link>
                    
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-main"
                    to="#"
                    id="dropdownId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Categories
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="dropdownId">
                    <Link className="dropdown-item" to="games/Categories/racing/racing">
                    racing
                    </Link>
                    <Link className="dropdown-item" to="games/Categories/sports/sports">
                    sports
                    </Link>
                    <Link className="dropdown-item" to="games/Categories/social/social">
                    social
                    </Link>
                    <Link className="dropdown-item" to="games/Categories/shooter/shooter">
                    shooter
                    </Link>
                    <Link className="dropdown-item" to="games/Categories/open-world/open-world">
                    open-world
                    </Link>
                    <Link className="dropdown-item" to="games/Categories/zombie/zombie">
                    zombie
                    </Link>
                    <Link className="dropdown-item" to="games/Categories/action-rpg/action-rpg">
                    action-rpg
                    </Link>
                    <Link className="dropdown-item" to="games/Categories/action/action">
                    action
                    </Link>
                    <Link className="dropdown-item" to="games/Categories/flight/flight">
                    flight
                    </Link>
                    <Link className="dropdown-item" to="games/Categories/battle-royale/battle-royale">
                    battle-royale
                    </Link>
                   
                    
                  </div>
                </li>
               
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {userData === null ? (
                <>
                  <li className="nav-item ">
                    <Link className="nav-link py-1 px-2 text-main" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link btn-outline btn btn-blue text-blue py-1 px-2"
                      to="register"
                    >
                      Join Free
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <span
                    onClick={logOut}
                    className="nav-link btn-outline btn btn-blue text-blue py-1 px-2"
                  >
                    Log out
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
