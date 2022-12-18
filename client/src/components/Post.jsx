import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { TiDelete, TiRefresh } from "react-icons/ti";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePost, deletePost } from "../features/post/postSlice";

function Post({ post }) {
  const [comments, setComments] = useState(post.comments.length);
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

  const refreshPage = () => window.location.reload(false);

  const deleteHandler = () => {
    dispatch(deletePost(post._id))
      .unwrap()
      .then(() => {
        refreshPage();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="post">
      <div className="post-div">
        <div>
          <p>Created by</p>
          <p className="date">{post.createdAt.slice(0, 10)}</p>
        </div>
        <div>
          <TiRefresh className="update" />
          <TiDelete className="delete" onClick={deleteHandler} />
        </div>
      </div>
      <div className="post-desc">
        <span>{post?.desc}</span>
        {post.image && (
          <img className="post-image" src={`images/${post.image}`} alt="Post" />
        )}
      </div>
      <div className="post-likes">
        <div>
          <AiFillLike className="like-comment" onClick={likeHandler} />
          {like}
        </div>
        <div>
          <FaComments className="like-comment" />
          {comments}
        </div>
      </div>
    </div>
  );
}

export default Post;
