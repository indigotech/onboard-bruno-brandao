import { useQuery } from "@apollo/client";
import "../styles/Modal.css";
import { GET_USER_ID } from "../graphql/query/Query";
import Loading from "./Loading";

interface ModalProps {
  onClose: () => void;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  birthDate: string;
}

export function Modal({ onClose, userId }: ModalProps) {
  const { loading, error, data } = useQuery<{ user: User }>(GET_USER_ID, {
    variables: { id: userId },
  });

  if (loading)
    return (
      <div className="Modal">
        <div className="Modal-content">
          <div className="Modal-loading">
            <Loading />
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="modal">
        <div className="modal-content">
          <p>Error: {error.message}</p>
        </div>
      </div>
    );

  if (!data) return null;
  const { user } = data;

  return (
    <div className="Modal">
      <div className="Modal-content">
        <span className="Close" onClick={onClose}>
          &times;
        </span>
        <h1 className="Modal-title"> Detalhes </h1>
        <p className="Modal-p">
          ID: <span className="Modal-span">{user.id}</span>
        </p>
        <p className="Modal-p">
          Nome: <span className="Modal-span">{user.name}</span>
        </p>
        <p className="Modal-p">
          E-mail: <span className="Modal-span">{user.email}</span>
        </p>
        <p className="Modal-p">
          Data de nascimento:
          <span className="Modal-span">{user.birthDate}</span>
        </p>
        <p className="Modal-p">
          Telefone: <span className="Modal-span">{user.phone}</span>
        </p>
        <p className="Modal-p">
          Função: <span className="Modal-span">{user.role}</span>
        </p>
      </div>
    </div>
  );
}
