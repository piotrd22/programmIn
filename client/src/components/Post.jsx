import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "../features/post/postSlice";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  const likeHandler = () => {
    dispatch(likePost(post._id))
      .unwrap()
      .then(() => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      })
      .catch((error) => {
        alert(error);
      });
  };
  
  return (
    <div className="post">
      <div className="post-div">
        <span>Created by</span>
        <span className="date">{post.createdAt.slice(0, 10)}</span>
      </div>
      <div className="post-desc">
        <span>{post?.desc}</span>
        {post.image && <p>Zdjecie</p>}
      </div>
      <div className="post-likes">
        <div>
          <AiFillLike className="like-comment" onClick={likeHandler} />
          {like}
        </div>
        <div>
          <FaComments className="like-comment" />
          {post.comments.length}
        </div>
      </div>
    </div>
  );
}

export default Post;
