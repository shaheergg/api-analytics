import React, { useState } from "react";
import LogoLight from "../components/LogoLight";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setIsAuthenticated } = useAuth();
  const [error, setError] = useState(null);
  const signupHanfler = (e) => {
    e.preventDefault();

    // Check for empty username or password
    if (!username || !password) {
      console.error("Username and password are required");
      setError("Username and password are required");
      return;
    }

    fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        // Check for non-successful response status
        if (!response.ok) {
          console.error("Signup failed:", response.statusText);
          throw new Error("Signup failed");
        }

        return response.json();
      })
      .then((data) => {
        // Check if token is present in the response data
        if (data?.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          setIsAuthenticated(true);
        } else {
          console.error("Token not found in response");
        }
      })
      .catch((error) => {
        console.error("An error occurred during login:", error.message);
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <LogoLight />
        <div>
          <h2 className="text-lg font-semibold">Create your workos account</h2>
        </div>
        {error && (
          <div className="p-4 text-red-500 bg-red-100 rounded w-96">
            {error}
          </div>
        )}
        <div className="p-4">
          <form className="flex flex-col gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 border rounded outline-none hover:outline-black w-96"
              placeholder="Your username..."
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border rounded outline-none hover:outline-black w-96"
              placeholder="Your password..."
            />
            <button
              onClick={signupHanfler}
              className="px-4 py-2 text-white bg-black rounded hover:bg-gray-900"
            >
              Sign up
            </button>
            <span className="mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-gray-500 hover:underline">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
