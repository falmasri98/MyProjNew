import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18next from "i18next";

import "./Navbar.css";

import Logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/auth-hook";

export default function Navbar() {
  const { t } = useTranslation();
  const { token, login, logout, userId, user } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("lang")
  );

  const handleChangeAppLanguage = (lang) => {
    localStorage.setItem("lang", lang);
    setCurrentLanguage(lang);
    i18next.changeLanguage(lang);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img      
          className="img-fluid"
            width="70"
            height="70"
            src={Logo}
            alt="Good Food, Good Mood" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <Link className="nav-link active" aria-current="page" to="/about-us">
                {t("about_us")}
              </Link>
              
              <Link
              className="nav-link text-black"
              aria-current="page"
              to="/contact-us"
            >
              {t("contact_us")}
            </Link>

            {user?.role === 'admin' && <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/admin/dashboard">
              {t("dashboard")}
              </Link>
            </li>}
            {user?.role === 'user' && <><li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/stores">
              {t("stores")}
              </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/user/dashboard">
            {t("dashboard")}
            </Link>
          </li></>}
          </ul>
          {!user && (
            <form className="d-flex" role="search">
              <Link to={`/auth`} className="btn btn-primary mx-2">
                {t("user_login")}
              </Link>
              <Link to={`/admin-auth`} className="btn btn-outline-primary">
              {t("login")}
              </Link>
            </form>
          )}
          {user && (
            <>
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/parakeet/28/user.png"
                alt="user"
              />
              <h6 className="mx-2 px-2 mb-0 fw-bold border-start border-end">
                Welcome, {user?.username}
              </h6>
              <button type="button" className="btn" onClick={logout}>Logout</button>
            </>
          )}
          <button
            className="btn"
            type="button"
            onClick={() =>
              handleChangeAppLanguage(currentLanguage === "ar" ? "en" : "ar")
            }
          >
            {currentLanguage === "ar" ? "اللغة الانجليزية" : "Arabic"}
          </button>
        </div>
      </div>
    </nav>
  );
}
