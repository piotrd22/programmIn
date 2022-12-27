import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Follower({ id }) {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const { user: curruser } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchUser().then((res) => setUser(`${res.name} ${res.surname}`));
  }, []);

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

export default Follower;
