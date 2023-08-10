import LoginForm from "@/app/components/auth/LoginForm";
import Modal from "@/app/components/structure/modal/Modal";
import React from "react";

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
