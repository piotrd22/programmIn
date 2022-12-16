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
          res.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      })
      .catch((error) => {
        alert(error);
      });
  }, [user._id, dispatch]);

  return (
    <div>
      <PostForm />
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
