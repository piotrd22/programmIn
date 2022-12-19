import { TiDelete, TiRefresh } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { uncommentPost } from "../features/post/postSlice";
import { useState } from "react";
import CommentUpdateForm from "./CommentUpdateForm";

function Comment({ comment, post, del, update }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useDispatch();

  const objectToDel = {
    postId: post._id,
    desc: comment.desc,
    id: comment.id,
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
        <p>{comment.postedBy}</p>
        <p>{comment.desc}</p>
        <div>
          <TiRefresh className="update" onClick={updateHandler} />
          <TiDelete className="delete" onClick={handleDelete} />
        </div>
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
