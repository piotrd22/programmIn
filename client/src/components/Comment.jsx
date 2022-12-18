import { TiDelete } from "react-icons/ti";

function Comment({ comment }) {
  return (
    <div>
      <div className="comment">
        <p>Created By</p>
        <p>{comment.desc}</p>
        <TiDelete className="delete"/>
      </div>
    </div>
  );
}

export default Comment;
