import { useEffect, useState } from "react";
import { BsFillChatFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { getUserFollowing } from "../features/user/userSlice";
import Loader from "../components/Loader";
import UsersTableChat from "../components/UsersTableChat";
import axios from "axios";

function ChatSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [followers, setUserFollowers] = useState([]);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserFollowing(user._id))
      .unwrap()
      .then((res) => setUserFollowers(res))
      .catch((error) => {
        alert(error);
      });
  }, [user._id, dispatch]);

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
    //eslint-disable-next-line
  }, [query]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <section className="heading">
        <h1>
          <BsFillChatFill /> Chat with friends or search
        </h1>
      </section>
      <input
        className="input"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      {query.length > 2 ? (
        <UsersTableChat users={users} />
      ) : (
        <UsersTableChat users={followers} />
      )}
    </div>
  );
}

export default ChatSearch;
