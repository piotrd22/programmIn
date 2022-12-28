import { TiDelete, TiRefresh } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { uncommentPost } from "../features/post/postSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommentUpdateForm from "./CommentUpdateForm";
import axios from "axios";

function Comment({ comment, post, del, update }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [username, setUsername] = useState("");

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const objectToDel = {
    postId: post._id,
    desc: comment.desc,
    id: comment.id,
  };

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
      `http://localhost:8080/api/users/${comment.postedBy}`,
      config
    );

    return res.data;
  };

  const handleDelete = () => {
    dispatch(uncommentPost(objectToDel))
      .unwrap()
      .then((res) => {
        del(res);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const updateHandler = () => {
    setIsUpdating(!isUpdating);
  };

  return (
    <div>
      <div className="comment">
        <Link to={`/profile/${comment.postedBy}`}>{username}</Link>
        <p>{comment.desc}</p>
        {comment.postedBy === user._id ? (
          <div>
            <TiRefresh className="update" onClick={updateHandler} />
            <TiDelete className="delete" onClick={handleDelete} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {isUpdating && (
        <CommentUpdateForm
          comment={comment}
          update={update}
          updateHandler={updateHandler}
          post={post}
        />
      )}
    </div>
  );
}

export default Comment;
