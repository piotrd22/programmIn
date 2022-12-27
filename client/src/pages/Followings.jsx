import { Link, useParams } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserFollowing } from "../features/user/userSlice";
import Follower from "../components/Follower";

function Followers() {
  const id = useParams().id;
  const [followers, setUserFollowers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFollowing(id))
      .unwrap()
      .then((res) => setUserFollowers(res))
      .catch((error) => {
        alert(error);
      });
  }, [id, dispatch]);

  return (
    <div>
      <section className="heading">
        <h1>
          <FaUserAlt /> Following
        </h1>
      </section>

      <section>
        <div className="followers-list">
          <ul>
            {followers.map((follower, index) => {
              return (
                <li key={index}>
                  <Link to={`/profile/${follower}`}>
                    <Follower id={follower} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Followers;
