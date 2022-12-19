import { useParams } from "react-router";
import { userPosts } from "../features/post/postSlice";
import { getUser } from "../features/user/userSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Post from "../components/Post";

function Profile() {
  const userId = useParams().id;
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

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
        setUser(res);
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
      Hello {userId}
      {user.name}
      {user.surname}
      {user.desc}
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
