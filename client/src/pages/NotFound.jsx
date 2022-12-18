import { Link } from "react-router-dom";

function NotFound({ data }) {
  return (
    <div>
      <h1>404 - Nie znaleziono strony: {data}</h1>
      <p>
        <Link to="/">Back To Home</Link>
      </p>
    </div>
  );
}

export default NotFound;
