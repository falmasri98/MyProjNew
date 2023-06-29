import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./StoresPage.css";

import { useHttpClient } from "../../hooks/http-hook";

export default function StroesPage() {
  const { sendRequest } = useHttpClient();
  const [allStores, setAllStores] = useState([]);

  const fetchAllStores = async () => {
    try {
      let responseData = await sendRequest(
        "http://localhost:5000/api/users/get-stores-list"
      );
      setAllStores(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllStores();
  }, []);

  return (
    <div className="store-page__container">
      <div className="stores-page__header">
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/small-business.png"
          alt="small-business"
        />
        <h1 className="text-light fw-bold">Our Stores List</h1>
      </div>
      <div className="stores-page__content">
        {allStores?.map((store) => (
          <div key={store.id} className="card" style={{ width: "18rem" }}>
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" className="card-img-top" alt="Store" />
            <div className="card-body">
              <h5 className="card-title text-capitalize fw-bold">{store.username}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <Link to={`/stores/${store.id}`} className="btn btn-primary text-light">
                View Store
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
