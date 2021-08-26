import React from "react";
import Header from "../../Reusables/Header/Header";
import SideBar from "../../SideBar/SideBar";
import OnlinePayment from "./OnlinePayment";

function index() {
  return (
    <div>
      <Header />
      <SideBar />
      <OnlinePayment />
    </div>
  );
}

export default index;
