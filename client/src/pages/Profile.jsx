import { userPosts } from "../features/post/postSlice";
import { getUser } from "../features/user/userSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
import Post from "../components/Post";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);
  const [curruser, setCurruser] = useState(user);

  useEffect(() => {
    dispatch(userPosts(user._id))
      .unwrap()
      .then((res) => {
        setPosts(
          res.sort((x, y) => {
            return new Date(y.createdAt) - new Date(x.createdAt);
          })
        );
      })
      .catch((error) => {
        alert(error);
      });
  }, [user._id, dispatch]);

  useEffect(() => {
    dispatch(getUser(user._id))
      .unwrap()
      .then((res) => {
        setCurruser(res);
      })
      .catch((error) => {
        alert(error);
      });
  }, [user._id, dispatch]);

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post._id !== id));
  };

  const handleUpdate = (newPost) => {
    setPosts(posts.map((post) => (newPost._id === post._id ? newPost : post)));
  };

  return (
    <div>
      <div>
        {curruser.backPicture ? (
          <img
            crossOrigin="anonymous"
            className="post-image"
            src={`http://localhost:8080/images/${curruser.backPicture}`}
            alt="CoverPhoto"
          />
        ) : (
          <p>Cover Photo</p>
        )}
      </div>
      <div>
        {curruser.profilePicture ? (
          <img
            crossOrigin="anonymous"
            className="post-image"
            src={`http://localhost:8080/images/${curruser.profilePicture}`}
            alt="Profile Pic"
          />
        ) : (
          <FaUserAlt />
        )}
      </div>
      <div>
        <span>{curruser.name}</span>
        <span>{curruser.surname}</span>
      </div>
      <div>{curruser.description && curruser.description}</div>
      <div>
        <p>{curruser.email}</p>
      </div>
      <div>
        <button>More Info</button>
      </div>
      <div>
        Followers {curruser.followers.length}
        Following {curruser.following.length}
      </div>
      <div>{user._id !== curruser._id && <button>Follow</button>}</div>
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          del={handleDelete}
          update={handleUpdate}
        />
      ))}
    </div>
  );
}

export default Profile;
