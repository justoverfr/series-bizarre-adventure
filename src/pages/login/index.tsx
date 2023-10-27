import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import BigButton from "@/components/BigButton";
import { login } from "@/lib/auth/login";
import "./login.css";

import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase-config";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      navigate("/calendar");
    }
  });

  const handleLoginClick = async () => {
    setErrorMessage("");
    if (email && password) {
      const user = await login(email, password);
      if (user) {
        navigate("/calendar");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } else {
      if (!email) {
        setErrorMessage("Email is required");
      } else {
        setErrorMessage("Password is required");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-3 w-1/4 mx-auto bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg items-center justify-center h-fit">
        <h1 className="text-[36px] mb-5 text-[#6643b5] not-italic font-medium leading-6 font-Raleway">
          Log In
        </h1>
        <FormInput
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage != "" && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
        <BigButton text="Log In" onClick={handleLoginClick} />
      </div>
    </div>
  );
}
