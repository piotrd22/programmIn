import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { uncommentPost } from "../features/post/postSlice";

function Comment({ comment, post, del }) {
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

  return (
    <div>
      <div className="comment">
        <p>{comment.postedBy}</p>
        <p>{comment.desc}</p>
        <TiDelete className="delete" onClick={handleDelete} />
      </div>
    </div>
  );
}

export default Comment;
