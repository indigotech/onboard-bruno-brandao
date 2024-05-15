import "../styles/List.css";
import { GET_USERS } from "../graphql/query/Query";
import Loading from "../components/Loading";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import Fab from "../components/Fab";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UsersResponse {
  users: {
    nodes: User[];
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

  return (
    <div className="List-container">
      <header className="Title-container">Lista de Usuários</header>
      {loading ? (
        <Loading />
      ) : (
        <div className="List-container">
          <ul className="User-list">
            {data &&
              data.users.nodes.map((user: User) => (
                <li key={user.id} className="List-item-container">
                  <span className="User-name"> {user.name} </span>
                  <br />
                  <span className="User-email"> {user.email} </span>
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
        </div>
      )}
      <Fab />
    </div>
  );
}

export default List;
