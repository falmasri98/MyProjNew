import React from "react";
import "./AdminHomePage.css";

import DataTable from "../../../components/DataTable/DataTable";

export default function AdminHomePage({ users, providers, fetchUsers }) {
  return (
    <div className="admin-homepage__container">
      <div className="home-page__items">
        <div className="home-page__item">
          <div className="header">
            <i className="bx bx-user me-1 mb-0"></i>
            <h6 className="fw-bold">Number of users</h6>
          </div>
          <h1 className="w-100 text-center">{users?.length}</h1>
        </div>
        <div className="home-page__item">
          <div className="header">
            <i className="bx bx-store-alt me-1"></i>
            <h6 className="fw-bold">Number of stores</h6>
          </div>
          <h1 className="w-100 text-center">{providers?.length}</h1>
        </div>
      </div>
      <div className="row w-100 mt-4">
        <div className="col-xs-12 col-lg-6">
          <div className="table-header mb-3">
            <h5 className="fw-bold">Stores List</h5>
          </div>
          <DataTable users={providers} fetchUsers={fetchUsers} />
        </div>
        <div className="col-xs-12 col-lg-6">
          <div className="table-header mb-3">
            <h5 className="fw-bold">Users List</h5>
          </div>
          <DataTable users={users} fetchUsers={fetchUsers} />
        </div>
      </div>
    </div>
  );
}
