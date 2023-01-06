import { format } from "timeago.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Message({ message, bool }) {
  const [username, setUsername] = useState("");
  const { user } = useSelector((state) => state.auth);

  const fetchUser = async () => {
    const config = {
      headers: {
        token: "Bearer " + user.token,
      },
    };

    const res = await axios.get(
      `http://localhost:8080/api/users/${message.sender}`,
      config
    );

    return res.data;
  };

  useEffect(() => {
    fetchUser().then((res) => setUsername(`${res.name} ${res.surname}`));
  }, []);
  return (
    <div className={bool ? "my-mess" : "nm-mess"}>
      <div className="top">
        <p>{username}</p>
        <p>{format(message.createdAt)}</p>
      </div>
      <div className="bottom">
        <p>{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
