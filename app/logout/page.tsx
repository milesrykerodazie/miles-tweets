import React from "react";
import LogoutModal from "../components/structure/modal/LogoutModal";
import Logout from "../components/Logout";

const LogoutPage = () => {
  return (
    <LogoutModal>
      <Logout />
    </LogoutModal>
  );
};

export default LogoutPage;
