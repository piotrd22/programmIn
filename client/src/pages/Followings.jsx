import { useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFollowing } from "../features/user/userSlice";
import UsersTable from "../components/UsersTable";
import Loader from "../components/Loader";

function Followings() {
  const id = useParams().id;
  const [followers, setUserFollowers] = useState([]);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserFollowing(id))
      .unwrap()
      .then((res) => setUserFollowers(res))
      .catch((error) => {
        alert(error);
      });
  }, [id, dispatch]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <section className="heading">
        <h1>
          <FaUserAlt /> Following
        </h1>
      </section>

      <UsersTable users={followers} />
    </div>
  );
}

export default Followings;
