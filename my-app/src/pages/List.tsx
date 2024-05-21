import "../styles/List.css";
import { GET_USERS } from "../graphql/query/Query";
import Loading from "../components/Loading";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import Fab from "../components/Fab";
import { Modal } from "../components/Modal";

interface Users {
  id: number;
  name: string;
  email: string;
}

interface UsersResponse {
  users: {
    nodes: Users[];
    pageInfo: {
      hasNextPage: boolean;
    };
  };
}

interface UsersVars {
  limit: number;
  offset: number;
}

const LIMIT = 10;

function List() {
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { loading, data, fetchMore } = useQuery<UsersResponse, UsersVars>(
    GET_USERS,
    {
      variables: { limit: LIMIT, offset: 0 },
    },
  );

  const loadMore = () => {
    if (!hasMore) return;

    setLoadingMore(true);
    fetchMore({
      variables: {
        offset: offset + LIMIT,
        limit: LIMIT,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (!fetchMoreResult.users.pageInfo.hasNextPage) setHasMore(false);
        return {
          ...prev,
          users: {
            ...prev.users,
            nodes: [...prev.users.nodes, ...fetchMoreResult.users.nodes],
            pageInfo: fetchMoreResult.users.pageInfo,
          },
        };
      },
    }).finally(() => setLoadingMore(false));

    setOffset(offset + LIMIT);
  };

  const handleUserClick = (id: number) => {
    setIsOpen(true);
    setSelectedUserId(id);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="List-container">
      <header className="Title-container">Lista de Usuários</header>
      {loading ? (
        <Loading />
      ) : (
        <div className="List-container">
          <ul className="User-list">
            {data &&
              data.users.nodes.map((users: Users) => (
                <li
                  key={users.id}
                  className="List-item-container"
                  onClick={() => handleUserClick(users.id)}
                >
                  <span className="User-name"> {users.name} </span>
                  <br />
                  <span className="User-email"> {users.email} </span>
                </li>
              ))}
            {hasMore ? (
              loadingMore ? (
                <Loading />
              ) : (
                <div className="List-container">
                  <button className="Loading-button" onClick={loadMore}>
                    Carregue mais users
                  </button>
                </div>
              )
            ) : (
              <span className="Warning">
                Todos os usuários já foram listados
              </span>
            )}
          </ul>
          {isOpen && selectedUserId !== null && (
            <Modal onClose={handleCloseModal} userId={selectedUserId} />
          )}
        </div>
      )}
      <Fab />
    </div>
  );
}

export default List;
