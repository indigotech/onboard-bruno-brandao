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
      <h1 className="text-2xl font-bold text-black mt-5 mb-5">
        Bem-vindo(a) à Taqtile!
      </h1>
      <form onSubmit={handleSignIn}>
        <div className="flex flex-col">
          <label
            className={`text1-1 font-regular mb-3 ${emailError ? "text-red-500" : "text-slate-700"}`}
          >
            e-mail:
          </label>
          <input
            type="text"
            className={`border rounded px-1 h-9 ${emailError ? "border-red-500" : "border-slate-300"}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <span className="text-red-500 text-xs regular mt-2 mb-2">
              {emailError}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label
            className={`text1-1 font-regular mb-3 ${passwordError ? "text-red-500" : "text-slate-700"}`}
          >
            senha:
          </label>
          <input
            type="password"
            className={`border rounded px-1 h-9 ${passwordError ? "border-red-500" : "border-slate-300"}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <span className="text-red-500 text-xs regular mt-2 mb-2">
              {passwordError}
            </span>
          )}
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col items-center justify-center mt-5">
            <button
              className="text-base font-normal bg-green-500 hover:bg-green-700 text-white w-40 h-11 flex items-center justify-center rounded"
              type="submit"
            >
              Entrar
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
