import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateComment } from "../features/post/postSlice";

function CommentUpdateForm({ post, update, comment, updateHandler }) {
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};

    if (!values.desc) {
      errors.desc = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      id: comment.id,
      desc: comment.desc,
      postId: post._id,
      username: comment.username,
    },
    validate,
    onSubmit: (comment) => {
      dispatch(updateComment(comment))
        .unwrap()
        .then((res) => {
          update(res);
          updateHandler();
        })
        .catch((error) => {
          alert(error);
        });
    },
  });

  return (
    <div>
      <section className="comment-form">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group-post">
            <input
              type="text"
              name="desc"
              id="desc"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.desc}
            />
            <button className="btn-comment" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CommentUpdateForm;
