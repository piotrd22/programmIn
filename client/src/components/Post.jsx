import { AiFillLike } from "react-icons/ai";
import { FaComments } from "react-icons/fa";

function Post({ post }) {
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
          <AiFillLike className="like-comment" />
          {post.likes.length}
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
