import React from "react";
import Modal from "../components/structure/modal/Modal";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <Modal>
      <div className="w-[95%] lg:w-[80%] mx-auto">
        <LoginForm />
      </div>
    </Modal>
  );
};

export default Login;
