import "../styles/Login.css";
import { FormEvent, useState } from "react";
import { validatePassword, validateEmail } from "../utils/Regex";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations/Mutations";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function Login() {
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();

    switch (true) {
      case email === "":
        return alert("O campo de email não pode estar vazio.");
      case password === "":
        return alert("O campo de senha não pode estar vazio.");
      case !validateEmail.test(email):
        return alert("Por favor digite um e-mail válido! ");
      case !validatePassword.test(password):
        return alert(
          "A senha deve ter no mínimo 7 caracteres sendo ao menos uma letra e um dígito",
        );
      default:
    }

    try {
      const result = await login({ variables: { input: { email, password } } });
      const token = result.data.login.token;
      localStorage.setItem("token", token);
      navigate("/list");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Credenciais inválidas. Por favor, tente novamente.");
    }
  }
  return (
    <div className="Login-container">
      <h1 className="Login-h1"> Bem-vindo(a) à Taqtile!</h1>
      <form onSubmit={handleSignIn}>
        <div className="Login">
          <label className="Login-label-text">E-mail:</label>
          <input
            type="text"
            className="Login-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="Login">
          <label className="Login-label-text">Senha:</label>
          <input
            type="password"
            className="Login-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <button className="Login-button" type="submit">
            Entrar
          </button>
        )}
      </form>
    </div>
  );
}

export default Login;
