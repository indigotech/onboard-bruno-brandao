import { useState } from "react";
import "../styles/List.css";
import { useNavigate } from "react-router-dom";
import fab from "../img/Add_user_icon_(blue).svg-fotor-20240515155524.png";

function Fab() {
  const [showAddUserButton, setShowAddUserButton] = useState(false);
  const navigate = useNavigate();

  const handleFabClick = () => {
    setShowAddUserButton(!showAddUserButton);
  };

  const fabButton = () => {
    navigate("/add-user");
  };

  return (
    <>
      <button className="Fab" onClick={handleFabClick}>
        +
      </button>

      {showAddUserButton && (
        <button className="Fab-add" onClick={fabButton}>
          <div className="Fab-container">
            <img src={fab} alt="Fab" className="Fab-image" />
          </div>
        </button>
      )}
    </>
  );
}

export default Fab;
