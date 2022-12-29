import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function User({ id }) {
  const [user, setUser] = useState("");
  const { user: curruser } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchUser().then((res) => setUser(`${res.name} ${res.surname}`));
  });

  const fetchUser = async () => {
    const config = {
      headers: {
        token: "Bearer " + curruser.token,
      },
    };

    const res = await axios.get(
      `http://localhost:8080/api/users/${id}`,
      config
    );

    return res.data;
  };

  return <div>{user}</div>;
}

export default User;