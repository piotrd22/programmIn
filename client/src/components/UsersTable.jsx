import { Link } from "react-router-dom";
import profile from "../assets/profile.png";

function UsersTable({ users }) {
  return (
    <div>
      {users.map((user) => (
        <Link
          to={`/profile/${user._id}`}
          key={user._id}
          className="user-search"
        >
          {user.profilePicture ? (
            <img
              crossOrigin="anonymous"
              className="post-image"
              src={`http://localhost:8080/images/${user.profilePicture}`}
              alt="Profile Pic"
            />
          ) : (
            <img className="post-image" src={profile} alt="CoverPhoto" />
          )}
          <p>
            {user.name} {user.surname}
          </p>
          <p>{user.email}</p>
        </Link>
      ))}
    </div>
  );
}

export default UsersTable;
