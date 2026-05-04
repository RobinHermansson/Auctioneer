import { useState } from "react";
import "./Login.css";
import loginUser from "../../services/loginService";

interface LoginProps {
  setToken: (tokenString: string) => void;
}

const Login = ({setToken}: LoginProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("")
      var response = await loginUser({ email, password });
      if (response.token)
        setToken(response.token)
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h3>Login to Auctioneer</h3>
      <div className="loginControls">
        <input
          className="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Your email"
        ></input>
        <input
          className="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Your password"
        ></input>
        <button
          className="submitButton"
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading ? "Signing in..." : "Sign in."}
        </button>
        {error != "" ?
        <p>{error}</p> : <></>}
      </div>
    </>
  );
};

export default Login;
