import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit 버튼 클릭 시 처리할 로직을 작성합니다.
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <div className="button-container">
          <button type="submit">Sign In</button>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
