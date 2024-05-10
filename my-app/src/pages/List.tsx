import "../styles/List.css";

const users = [
  { id: 1, name: "Bruno", email: "bruno.brandao@taqtile.com" },
  { id: 2, name: "Matheus", email: "matheus.felix@taqtile.com.br" },
  { id: 3, name: "Alan", email: "alan.raso@taqtile.com.br" },
];

function List() {
  return (
    <div className="List-container">
      <h1 className="Title">Lista de Usuários</h1>
      <ul className="User-list">
        {users.map((user) => (
          <li key={user.id} className="List-item-container">
            <text className="User-name"> {user.name} </text>
            <br />
            <text className="User-email"> {user.email} </text>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
