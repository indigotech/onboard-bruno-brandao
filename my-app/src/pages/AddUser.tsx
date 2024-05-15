import { FormEvent, useState } from "react";
import "../styles/Adduser.css";
import taq from "../img/Logo_Quadrado_Preto.png";
import { validateBirthDate, validateEmail } from "../utils/Regex";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  async function handleSignup(e: FormEvent) {
    e.preventDefault();

    switch (true) {
      case email === "":
        return alert("O campo de email não pode estar vazio.");
      case !validateEmail.test(email):
        return alert("Por favor digite um e-mail válido! ");
      case name === "":
        return alert("O campo de nome não pode estar vazio.");
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
  }
  return (
    <div className="Split-screen">
      <div className="Left">
        <img src={taq} alt="Taqtile" className="Logo" />
      </div>
      <div className="Right">
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

            <label className="Label-text">Número:</label>
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
      </div>
    </div>
  );
}

export default AddUser;
