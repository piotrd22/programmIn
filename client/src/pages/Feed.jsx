import PostForm from "../components/PostForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homePosts } from "../features/post/postSlice";
import Post from "../components/Post";

function Feed() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dispatch(homePosts())
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

  const handleAdd = (post) => {
    setPosts([post, ...posts]);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post._id !== id));
  };

  const handleUpdate = (newPost) => {
    setPosts(posts.map((post) => (newPost._id === post._id ? newPost : post)));
  };

  return (
    <div>
      <PostForm add={handleAdd} />
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

export default Feed;
