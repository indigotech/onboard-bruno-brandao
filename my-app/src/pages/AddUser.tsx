import { FormEvent, useState } from "react";
import taq from "../img/Logo_Quadrado_Preto.png";
import {
  validateBirthDate,
  validateEmail,
  validatePassword,
} from "../utils/Regex";
import { CREATE_USER } from "../graphql/mutations/Mutations";
import Loading from "../components/Loading";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  async function handleSignup(e: FormEvent) {
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

    if (name === "") {
      setNameError("O campo de nome não pode estar vazio.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (phone === "") {
      setPhoneError("O campo de telefone não pode estar vazio.");
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (birthDate === "") {
      setBirthDateError("O campo da data de nascimento não pode estar vazio.");
      hasError = true;
    } else if (!validateBirthDate(birthDate)) {
      setBirthDateError(
        "A data de nascimento é inválida ou você é menor de 18 anos.",
      );
      hasError = true;
    } else {
      setBirthDateError("");
    }

    if (role === "") {
      setRoleError("O campo da função não pode estar vazio.");
      hasError = true;
    } else {
      setRoleError("");
    }

    if (!hasError) {
      try {
        await createUser({
          variables: {
            input: { name, email, phone, role, birthDate, password },
          },
        });
        navigate("/list");
        window.location.reload();
      } catch (error) {
        console.error("Error during login:", error);
        alert("Credenciais inválidas. Por favor, tente novamente.");
      }
    }
  }
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex justify-center items-center h-20% md:h-full bg-[rgba(14,14,14,0.964)] w-full md:w-1/2">
        <img
          src={taq}
          alt="Taqtile"
          className="max-w-[40%] max-h-[40%] object-contain"
        />
      </div>
      <div className="flex justify-center items-center h-80% md:h-full w-full md:w-1/2">
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSignup}>
            <h1 className="text-center text-2xl font-bold text-black mt-5 mb-5">
              Cadastro
            </h1>
            <div className="flex flex-col items-center">
              <label
                className={`text1-1 text-left w-52 font-regular mb-3 ${nameError ? "text-red-500" : "text-slate-700"}`}
              >
                Nome:
              </label>
              <input
                type="text"
                className={`border rounded px-1 h-9 h-10 w-52 mb-3 ${nameError ? "border-red-500" : "border-slate-300"}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && (
                <span className="text-red-500 text-xs w-52 regular  mb-1">
                  {nameError}
                </span>
              )}

              <label
                className={`text1-1 text-left w-52 font-regular mb-3 ${emailError ? "text-red-500" : "text-slate-700"}`}
              >
                E-mail:
              </label>
              <input
                type="text"
                className={`border rounded px-1 h-9 w-52 mb-3 ${emailError ? "border-red-500" : "border-slate-300"}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <span className="text-red-500 text-xs regular  mb-1 w-52">
                  {emailError}
                </span>
              )}

              <label
                className={`text1-1 text-left w-52 font-regular mb-3 ${passwordError ? "text-red-500" : "text-slate-700"}`}
              >
                Senha:
              </label>
              <input
                type="password"
                className={`border rounded px-1 h-9 w-52 mb-3 ${passwordError ? "border-red-500" : "border-slate-300"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <span className="text-red-500 text-xs regular  mb-1 w-52">
                  {passwordError}
                </span>
              )}

              <label
                className={`text1-1 text-left w-52 font-regular mb-3 ${phoneError ? "text-red-500" : "text-slate-700"}`}
              >
                Telefone:
              </label>
              <input
                type="text"
                className={`border rounded px-1 h-9 w-52 mb-3 ${phoneError ? "border-red-500" : "border-slate-300"}`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {phoneError && (
                <span className="text-red-500 text-xs regular  mb-1 w-52">
                  {phoneError}
                </span>
              )}

              <label
                className={`text1-1 text-left w-52 font-regular mb-3 ${birthDateError ? "text-red-500" : "text-slate-700"}`}
              >
                Data de nascimento:
              </label>
              <input
                type="text"
                className={`border rounded px-1 h-9 w-52 mb-3 ${birthDateError ? "border-red-500" : "border-slate-300"}`}
                value={birthDate}
                onChange={(e) => setbirthDate(e.target.value)}
              />
              {birthDateError && (
                <span className="text-red-500 text-xs regular mb-1 w-52">
                  {birthDateError}
                </span>
              )}

              <label
                className={`text1-1 text-left w-52 font-regular mb-3 ${roleError ? "text-red-500" : "text-slate-700"}`}
              >
                Função:
              </label>
              <input
                type="text"
                className={`border rounded px-1 h-9 w-52 mb-3 ${roleError ? "border-red-500" : "border-slate-300"}`}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              {roleError && (
                <span className="text-red-500 text-xs regular mb-1 w-52">
                  {roleError}
                </span>
              )}
              <button
                className="bg-[#0b7b10] text-s text-white p-2 mt-5 w-44 h-12 border-none rounded-xl cursor-pointer transition ease duration-300 font-bold hover:bg-[#4adb64]"
                type="submit"
              >
                Cadastrar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddUser;
