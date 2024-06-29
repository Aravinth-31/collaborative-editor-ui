import React, { useState } from 'react';
import axios from 'axios';
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        username,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        window.location.href = "/";
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className={styles.LoginContainer}>
      <h2 className={styles.Title}>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='primary-btn' onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
