"use client";
import React, { useState } from "react";
import Input from "../inputs/Input";
import AuthButton from "@/app/components/Button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const RegisterForm = () => {
  //the router to navigate
  const router = useRouter();
  //the loading state
  const [isLoading, setIsLoading] = useState(false);

  //login credentials data initital states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //handle login method
  const handleRegister = async () => {
    setIsLoading(true);

    try {
      if (password !== confirmPassword) {
        toast.error("Passwords dont match, try again.");
        setPassword("");
        setConfirmPassword("");
        router.refresh();
        return;
      }

      const regData = {
        name,
        email,
        username,
        password,
      };

      const response = await axios.post("/api/register", regData);

      if (response?.data) {
        if (response?.data?.success === false) {
          toast.error(response?.data?.message);
        }
        if (response?.data?.success === true) {
          toast.success(response?.data?.message);
          setName("");
          setEmail("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          router.push("/auth/login");
        }
      }
    } catch (error: any) {
      console.log(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-7 space-y-5">
      <div className="flex justify-center items-center w-full flex-col">
        <div className="h-24 w-24 relative trans">
          <Image
            fill
            src="/images/tweet.png"
            alt="logo"
            className="object-cover"
          />
        </div>
        <h5 className="test-xl font-bold text-white capitalize">
          Join miles tweets today
        </h5>
      </div>
      <div className="flex flex-col gap-4 space-y-4">
        <Input
          id="name"
          label="Name"
          value={name}
          type="text"
          max={25}
          onChange={(event) => setName(event.target.value)}
          required
          disabled={isLoading}
        />
        <Input
          id="email"
          label="Email"
          value={email}
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={isLoading}
        />
        <Input
          id="username"
          label="Username"
          value={username}
          type="text"
          max={12}
          onChange={(event) => setUsername(event.target.value)}
          disabled={isLoading}
        />

        <Input
          id="password"
          label="Password"
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={isLoading}
        />
        <Input
          id="confirmPassword"
          label="Confirm-Password"
          value={confirmPassword}
          type="password"
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col gap-4 mt-3">
        <AuthButton
          label="Register"
          onClick={handleRegister}
          disabled={isLoading}
          isPlain
        />
        <hr />
        <AuthButton
          label="Sign up with Google"
          icon={FcGoogle}
          onClick={() => signIn("google")}
        />
        <div className="text-gray-500 text-center mt-4 font-light">
          <p>
            Already have an account?
            <Link href="/login">
              <span
                //   onClick={onToggle}
                className="text-blue-500 cursor-pointer hover:underline font-semibold"
              >
                Log in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
