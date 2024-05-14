import "../styles/List.css";
import { LIST_QUERY } from "../query/Query";
import Loading from "./Loading";
import { useQuery } from "@apollo/client";

interface User {
  id: string;
  name: string;
  email: string;
}

function List() {
  const { loading, data } = useQuery<{ users: { nodes: User[] } }>(LIST_QUERY);

  return (
    <div className="List-container">
      <h1 className="Title">Lista de Usuários</h1>
      {loading ? (
        <Loading />
      ) : (
        <ul className="User-list">
          {data &&
            data.users.nodes.map((user: User) => (
              <li key={user.id} className="List-item-container">
                <span className="User-name"> {user.name} </span>
                <br />
                <span className="User-email"> {user.email} </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default List;
