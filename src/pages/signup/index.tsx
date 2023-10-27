import { useState } from "react";
import FormInput from "@/components/FormInput";
import BigButton from "@/components/BigButton";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { signup } from "@/lib/auth";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    console.log("signup");
    setErrorMessage("");
    if (email && password && username) {
      const user = await signup(username, email, password);
      if (user) {
        navigate("/calendar");
      } else {
        setErrorMessage("Cet email est déjà utilisé");
      }
    } else {
      if (!username) setErrorMessage("Veuillez entrer un nom d'utilisateur");
      if (!email) setErrorMessage("Veuillez entrer un email");
      if (!password) setErrorMessage("Veuillez entrer un mot de passe");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-3 w-1/4 mx-auto bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg items-center justify-center h-fit">
        <h1 className="text-[36px] mb-5 text-[#6643b5] not-italic font-medium leading-6 font-Raleway">
          SignUp
        </h1>
        <FormInput
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          <p className="text-red-600 text-sm">{errorMessage}</p>
        )}
        <BigButton text="SignUp" onClick={handleSignup} />
      </div>
    </div>
  );
}
