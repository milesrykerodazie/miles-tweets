import RegisterForm from "@/app/components/auth/RegisterForm";
import Modal from "@/app/components/structure/modal/Modal";
import React from "react";

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
