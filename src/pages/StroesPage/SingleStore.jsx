import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SuccessModal from "../../UI/SuccessModal";
import { useHttpClient } from "../../hooks/http-hook";
import { useAuth } from "../../hooks/auth-hook";
import moment from "moment";

import "./StoresPage.css";

export default function SingleStore() {
  let params = useParams();
  const { sendRequest } = useHttpClient();
  const { userId } = useAuth();

  const [services, setServices] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [selectedService, setSelectedService] = useState();

  const fetchAllServices = async () => {
    try {
      let responseData = await sendRequest(
        `http://localhost:5000/api/users/get-services`
      );

      setServices(
        responseData.filter(
          (service) =>
            service.provider_id == params["storeId"] &&
            service.available === true
        )
      );
      setStoreName(responseData[0]["username"]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = (bagId) => {
    setSelectedService(bagId);
    setOpenPaymentModal(true);
  };

  const handleClose = () => setOpenPaymentModal(false);

  const orderSurpriseBag = async (bagId) => {
    try {
      let responseData = await sendRequest(
        "http://localhost:5000/api/users/add-new-order",
        "POST",
        JSON.stringify({
          bag_id: bagId,
          user_id: userId,
          order_date: moment().format("MMMM Do YYYY, h:mm:ss a"),
        }),
        {
          "Content-Type": "application/json",
        }
      );

      if(responseData['bagAdded']) {
        fetchAllServices();
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  const visaContent = <div className="visa-payment w-100">
    <div className="w-100">
  <label htmlFor="visaCardNumber" className="form-label fw-bold">Credit card number</label>
  <input type="text" className="form-control" id="visaCardNumber" placeholder="1111-2222-3333-4444" />
</div>
<div className="w-100">
  <label htmlFor="expMonth" className="form-label fw-bold">Exp Month</label>
  <input type="text" className="form-control" id="expMonth" placeholder="Septemper" />
</div>
  </div>;

  return (
    <div className="single-store__container">
      <SuccessModal
        open={openPaymentModal}
        close={handleClose}
        title="Confirm Order"
        orderSurpriseBag={orderSurpriseBag}
        bagId={selectedService}
      >
        <p className="w-100 text-left">Please choose payment option you prefer:</p>
        <div className="row w-100 mb-4">
          <div className="col px-0">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="inlineFormCheck"
                name="payment"
                value="cash"
                
                onClick={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              <label className="form-check-label fw-bold" htmlFor="inlineFormCheck">
                Cash
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="inlineFormCheck1"
                name="payment"
                value="visa"
                
                onClick={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              <label className="form-check-label fw-bold" htmlFor="inlineFormCheck">
                Visa
              </label>
            </div>
          </div>
        </div>
        {selectedPaymentMethod === 'visa' && visaContent}
        {selectedPaymentMethod === 'cash' && <p>You can pay when your order is delivered to you.</p>}
      </SuccessModal>
      <div className="stores-page__header">
        <img
          width="96"
          height="96"
          src="https://img.icons8.com/color/96/small-business.png"
          alt="small-business"
        />
        <h1 className="text-light fw-bold text-capitalize">{storeName}</h1>
      </div>
      <div className="single-store__services">
        <h4 className="fw-bold mb-5">Available Surprise Bags</h4>
        <div className="services-list">
          {services?.map((item) => (
            <div key={item.id} className="store-service__item">
              <img
                width="94"
                height="94"
                src="https://img.icons8.com/3d-fluency/94/shopping-bag.png"
                alt="shopping-bag"
              />
              <h4 className="text-capitalize fw-bold mb-3 mt-1">
                {item.service_type} surprise bag
              </h4>
              <p className="text-center fw-bold">
                This bag contains a {item.service_category} category items
              </p>
              {/* <button className="btn btn-primary" onClick={() => orderSurpriseBag(item.service_id)}>Order Bag</button> */}
              <button
                className="btn btn-primary"
                onClick={() => handleOpen(item.service_id)}
              >
                Order Bag
              </button>
            </div>
          ))}
          {services?.length === 0 && (
            <div className="empty-services__list">
              <h5 className="fw-bold">There is no available bags to order</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
