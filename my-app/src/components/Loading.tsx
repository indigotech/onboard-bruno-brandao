import loading from "../img/Eclipse@1x-1.0s-200px-200px.svg";
import "../styles/List.css";

function Loading() {
  return (
    <div className="Loading-container">
      <img src={loading} alt="Loading" />
    </div>
  );
}

export default Loading;
