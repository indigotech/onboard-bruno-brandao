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
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Header } from "../components/Header";

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
            <Header title="Cadastro" />
            <div className="flex flex-col items-center">
              <Input
                label="Nome:"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
              />
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
              <Input
                label="Telefone:"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError}
              />
              <Input
                label="Data de nascimento:"
                value={birthDate}
                onChange={(e) => setbirthDate(e.target.value)}
                error={birthDateError}
              />
              <Input
                label="Função:"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                error={roleError}
              />
              <Button title="Cadastrar" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddUser;
