import { FormEvent, useState } from "react";
import { validatePassword, validateEmail } from "../utils/Regex";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations/Mutations";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

function Login() {
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    let hasError = false;

    if (email === "") {
      setEmailError("O campo de email não pode estar vazio.");
      hasError = true;
    } else if (!validateEmail.test(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (password === "") {
      setPasswordError("O campo de senha não pode estar vazio.");
      hasError = true;
    } else if (!validatePassword.test(password)) {
      setPasswordError(
        "A senha deve ter no mínimo 7 caracteres sendo ao menos uma letra e um dígito",
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      try {
        const result = await login({
          variables: { input: { email, password } },
        });
        const token = result.data.login.token;
        localStorage.setItem("token", token);
        navigate("/list");
      } catch (error) {
        console.error("Error during login:", error);
        alert("Credenciais inválidas. Por favor, tente novamente.");
      }
    }
  }
  return (
    <div className="flex flex-col h-screen items-center justify-center ">
      <Header title="Bem vindo(a) à Taqtile " />
      <form onSubmit={handleSignIn}>
        <div className="flex flex-col">
          <Input
            label="E-mail:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
          <Input
            label="Senha:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col items-center justify-center mt-5">
            <Button title="Entrar" />
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
