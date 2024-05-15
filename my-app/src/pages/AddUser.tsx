import { FormEvent, useState } from "react";
import "../styles/Adduser.css";
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
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  async function handleSignup(e: FormEvent) {
    e.preventDefault();

    switch (true) {
      case email === "":
        return alert("O campo de email não pode estar vazio.");
      case !validateEmail.test(email):
        return alert("Por favor digite um e-mail válido! ");
      case name === "":
        return alert("O campo de nome não pode estar vazio.");
      case password === "":
        return alert("O campo de senha não pode estar vazio.");
      case !validatePassword.test(password):
        return alert(
          "A senha deve ter no mínimo 7 caracteres sendo ao menos uma letra e um dígito",
        );
      case phone === "":
        return alert("O campo de telefone não pode estar vazio.");
      case role === "":
        return alert("O campo de role não pode estar vazio.");
      case birthDate === "":
        return alert("O campo de data de nascimento não pode estar vazio.");
      case !validateBirthDate(birthDate):
        return alert(
          "A data de nascimento é inválida ou você é menor de 18 anos.",
        );
      default:
    }

    try {
      console.log({ input: { name, email, phone, role, birthDate } });
      await createUser({
        variables: {
          input: { name, email, phone, role, birthDate, password },
        },
      });
      navigate("/list");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Credenciais inválidas. Por favor, tente novamente.");
    }
  }
  return (
    <div className="Split-screen">
      <div className="Left">
        <img src={taq} alt="Taqtile" className="Logo" />
      </div>
      <div className="Right">
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSignup} className="Form">
            <h1 className="Header"> Cadastro </h1>
            <div className="Form-group">
              <label className="Label-text">Nome:</label>
              <input
                type="text"
                className="Input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="Label-text">E-mail:</label>
              <input
                type="text"
                className="Input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="Label-text">Senha:</label>
              <input
                type="password"
                className="Input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label className="Label-text">Telefone:</label>
              <input
                type="text"
                className="Input-field"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <label className="Label-text">Data de nascimento:</label>
              <input
                type="text"
                className="Input-field"
                value={birthDate}
                onChange={(e) => setbirthDate(e.target.value)}
              />

              <label className="Label-text">Função:</label>
              <input
                type="text"
                className="Input-field"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />

              <button className="Button" type="submit">
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
