import PostForm from "../components/PostForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homePosts } from "../features/post/postSlice";
import Post from "../components/Post";
import Loader from "../components/Loader";

function Feed() {
  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homePosts())
      .unwrap()
      .catch((error) => {
        alert(error);
      });
  }, [user._id, dispatch]);

  if (isLoading) return <Loader />;

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
