import "./Login.css";
import React from "react";

function Login() {
  return (
    <div className="Login-container">
      <h1 className="Login-h1"> Bem-vindo(a) à Taqtile!</h1>
      <form>
        <div className="Login">
          <label className="Login-label-text">E-mail:</label>
          <input type="email" className="Login-input-field" />
        </div>
        <div className="Login">
          <label className="Login-label-text">Senha:</label>
          <input type="password" className="Login-input-field" />
        </div>
      </form>
      <button className="Login-button">Entrar</button>
    </div>
  );
}

export default Login;
