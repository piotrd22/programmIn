import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { TiDelete, TiRefresh } from "react-icons/ti";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePost, deletePost, getComments } from "../features/post/postSlice";
import { Link } from "react-router-dom";
import PostUpdateForm from "./PostUpdateForm";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import axios from "axios";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentLen, setCommentLen] = useState(post.comments.length);
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deletePost(post._id))
      .unwrap()
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  useEffect(() => {
    dispatch(getComments(post._id))
      .unwrap()
      .then((res) => {
        setComments(res);
      })
      .catch((error) => {
        alert(error);
      });
  }, [dispatch, post._id]);

  useEffect(() => {
    fetchUser().then((res) => setUsername(`${res.name} ${res.surname}`));
  });

  const fetchUser = async () => {
    const config = {
      headers: {
        token: "Bearer " + user.token,
      },
    };

    const res = await axios.get(
      `http://localhost:8080/api/users/${post.userId}`,
      config
    );

    return res.data;
  };

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

  const updateHandler = () => {
    setIsUpdating(!isUpdating);
  };

  const commentHandler = () => {
    setIsCommenting(!isCommenting);
  };

  const handleAddComments = (newComments) => {
    setCommentLen(commentLen + 1);
    setComments([...newComments]);
  };

  const handleDelComments = (newComments) => {
    setCommentLen(commentLen - 1);
    setComments([...newComments]);
  };

  const handleUpdComments = (newComments) => {
    setComments([...newComments]);
  };

  return (
    <div>
      <div className="post">
        <div className="post-div">
          <div>
            <Link to={`/profile/${post.userId}`}>{username}</Link>
            <p className="date">{post.createdAt.slice(0, 10)}</p>
          </div>
          {user._id === post.userId && (
            <div>
              <TiRefresh className="update" onClick={updateHandler} />
              <TiDelete className="delete" onClick={deleteHandler} />
            </div>
          )}
        </div>
        <div className="post-desc">
          <span>{post?.desc}</span>
          {post.image && (
            <img
              className="post-image"
              crossOrigin="anonymous"
              src={`http://localhost:8080/images/${post.image}`}
              alt="Post"
              style={{ maxHeight: 450 }}
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
            {commentLen}
          </div>
        </div>
        {isCommenting && (
          <div>
            <CommentForm post={post} add={handleAddComments} />
            {comments.map((comment, index) => {
              return (
                <Comment
                  key={index}
                  comment={comment}
                  post={post}
                  del={handleDelComments}
                  update={handleUpdComments}
                />
              );
            })}
          </div>
        )}
      </div>
      {isUpdating && (
        <PostUpdateForm post={post} updateHandler={updateHandler} />
      )}
    </div>
  );
}

export default Post;
