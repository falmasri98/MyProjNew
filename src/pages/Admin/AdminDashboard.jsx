import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";

import Sidebar from "../../UI/Sidebar";
import DashboardTitle from "../../UI/DashboardTitle";

// Admin Pages

import AdminHomePage from "./Home/AdminHomePage";
import AddUser from "./AddUser/AddUser";
import DeletedAccounts from "./DeletedAccounts/DeletedAccounts";
import EditContent from "./EditContent/EditContent";
import AddNewAdmin from "./AddNewAdmin/AddNewAdmin";

export default function CustomerDashboard() {

  const { sendRequest } = useHttpClient();

  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [deletedAccounts, setDeletedAccounts] = useState([]);
  const [aboutUsContent, setAboutUsContent] = useState([]);
  const [contactUsContent, setContactUsContent] = useState([]);

  const fetchUsers = async () => {
    try {
      let responseData = await sendRequest("http://localhost:5000/api/admin/get-users");
      if(responseData) {
        setUsers(responseData?.filter(account => account.role === 'user' && account.status === 'active'));
        setProviders(responseData?.filter(account => account.role === 'provider' && account.status === 'active'));
        setDeletedAccounts(responseData?.filter(account => account.status === "deleted"));
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAboutUsContent = async () => {
    try {
      let responseData = await sendRequest("http://localhost:5000/api/admin/get-aboutus-content");
      setAboutUsContent(responseData[0]);
    } catch(err) {
      console.log(err);
    }
  };

  const fetchContactUsContent = async () => {
    try {
      let responseData = await sendRequest("http://localhost:5000/api/admin/get-contactus-content");
      setContactUsContent(responseData[0]);
    } catch(err) {
      console.log(err);
    }
  };

  const fetchAdmins = async () => {
    try {
      let responseData = await sendRequest("http://localhost:5000/api/admin/get-admins");
      setAdmins(responseData);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAboutUsContent();
    fetchContactUsContent();
    fetchAdmins();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="home">
        <DashboardTitle name={"to admin dashboard"} />
        <Routes>
          <Route
            index
            element={
              <AdminHomePage users={users} providers={providers} admins={admins} fetchAdmins={fetchAdmins} fetchUsers={fetchUsers} />
            }
          />
          <Route
            path="/home"
            element={
              <AdminHomePage users={users} providers={providers} admins={admins} fetchAdmins={fetchAdmins} fetchUsers={fetchUsers} />
            }
          />
          <Route path="/add-new-user" element={<AddUser />} />
          <Route path="/add-new-admin" element={<AddNewAdmin />} />
          <Route path="/deleted-accounts" element={<DeletedAccounts deletedAccounts={deletedAccounts} />} />
          <Route path="/edit-content" element={<EditContent content={aboutUsContent} fetchAboutUsContent={fetchAboutUsContent} contactUsContent={contactUsContent} fetchContactUsContent={fetchContactUsContent} />} />
        </Routes>
      </div>
    </div>
  )
}
