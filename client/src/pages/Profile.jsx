import { useParams } from "react-router";
import { userPosts } from "../features/post/postSlice";
import { getUser } from "../features/user/userSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Post from "../components/Post";

function Profile() {
  const initialState = {
    name: "",
    surname: "",
    email: "",
    gender: "",
    nationality: "",
    experience: "",
    skills: "",
    education: "",
    city: "",
    description: "",
    githuburl: "",
    followers: [],
    following: [],
    profilePicture: "",
    backPicture: "",
  };

  const userId = useParams().id;
  const [posts, setPosts] = useState([]);
  const [curruser, setCurruser] = useState(initialState);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(userPosts(userId))
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
  }, [userId, dispatch]);

  useEffect(() => {
    dispatch(getUser(userId))
      .unwrap()
      .then((res) => {
        setCurruser(res);
      })
      .catch((error) => {
        alert(error);
      });
  }, [userId, dispatch]);

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
            className="post-image"
            src={`images/${curruser.backPicture}`}
            alt="CoverPhoto"
          />
        ) : (
          <p>Cover Photo</p>
        )}
      </div>
      <div>
        {curruser.profilePicture ? (
          <img
            className="post-image"
            src={`images/${curruser.profilePicture}`}
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