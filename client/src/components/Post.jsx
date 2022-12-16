function Post({ post }) {
  return (
    <div>
      <div>
        <span className="date">{post.createdAt.slice(0, 10)}</span>
      </div>
      <div>
        <span>{post?.desc}</span>
        {post.image && <p>Zdjecie</p>}
      </div>
      <div>
        <p>Likes {post.likes.length}</p>
        <p>Comments {post.comments.length}</p>
      </div>
    </div>
  );
}

export default Post;
