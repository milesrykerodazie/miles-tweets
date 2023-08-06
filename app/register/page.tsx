import React from "react";
import Modal from "../components/structure/modal/Modal";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <Modal>
      <div className="w-[95%] lg:w-[80%] mx-auto">
        <RegisterForm />
      </div>
    </Modal>
  );
};

export default Register;
