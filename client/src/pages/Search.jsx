import { useEffect, useState } from "react";
import axios from "axios";
import UsersTable from "../components/UsersTable";

function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/users/search?keyword=${query}`
    );
    setUsers(res.data);
  };

  useEffect(() => {
    if (query.length > 2) {
      const getData = setTimeout(() => {
        fetchData();
      }, 500);

      return () => clearTimeout(getData);
    }
  }, [query]);

  return (
    <div>
      <input
        className="input"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <UsersTable users={users} />
    </div>
  );
}

export default Search;
