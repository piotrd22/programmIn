import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { TiDelete, TiRefresh } from "react-icons/ti";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePost, deletePost, getComments } from "../features/post/postSlice";
import PostUpdateForm from "./PostUpdateForm";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState([]);
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

  const updateHandler = () => {
    setIsUpdating(!isUpdating);
  };

  const commentHandler = () => {
    setIsCommenting(!isCommenting);
    dispatch(getComments(post._id))
      .unwrap()
      .then((res) => {
        setComments(res);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <div className="post">
        <div className="post-div">
          <div>
            <p>{post.userId}</p>
            <p className="date">{post.createdAt.slice(0, 10)}</p>
          </div>
          <div>
            <TiRefresh className="update" onClick={updateHandler} />
            <TiDelete className="delete" onClick={deleteHandler} />
          </div>
        </div>
        <div className="post-desc">
          <span>{post?.desc}</span>
          {post.image && (
            <img
              className="post-image"
              src={`images/${post.image}`}
              alt="Post"
            />
          )}
        </div>
        <div className="post-likes">
          <div>
            <AiFillLike className="like-comment" onClick={likeHandler} />
            {like}
          </div>
          <div>
            <FaComments className="like-comment" onClick={commentHandler} />
            {post.comments.length}
          </div>
        </div>
        {isCommenting && (
          <div>
            <CommentForm post={post} />
            {comments.map((comment, index) => {
              return <Comment key={index} comment={comment} />;
            })}
          </div>
        )}
      </div>
      {isUpdating && <PostUpdateForm post={post} />}
    </div>
  );
}

export default Post;
