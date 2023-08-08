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

const LoginForm = () => {
  //the router to navigate
  const router = useRouter();
  //the loading state
  const [isLoading, setIsLoading] = useState(false);

  //login credentials data initital states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handle login method

  const handleLogin = () => {
    setIsLoading(true);

    signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    })
      .then((response) => {
        if (response?.error === null) {
          toast.success("You are logged in.");
          router.push("/home");
          router.refresh();
        }
        if (response?.error !== null) {
          toast.error(response?.error!);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        setEmail("");
        setPassword("");
      });
  };
  return (
    <div className="pt-20 space-y-5">
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
          Sign in to miles tweets
        </h5>
      </div>
      <div className="flex flex-col gap-4 space-y-4">
        <Input
          id="email"
          label="Email"
          value={email}
          type="text"
          onChange={(event) => setEmail(event.target.value)}
          required
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
      </div>

      <div className="flex flex-col gap-4 mt-3">
        <AuthButton label="Login" onClick={handleLogin} disabled={isLoading} />
        <hr />
        <AuthButton
          label="Login With Google"
          icon={FcGoogle}
          onClick={() => signIn("google")}
        />
        <div className="text-gray-500 text-center mt-4 font-light">
          <p>
            Are you a new user?
            <Link href="/register">
              <button
                //   onClick={onToggle}
                className="text-blue-500 cursor-pointer hover:underline font-semibold"
              >
                Register
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
