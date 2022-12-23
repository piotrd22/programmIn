import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../features/post/postSlice";

function CommentForm({ post, add }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const validate = (values) => {
    const errors = {};

    if (!values.desc) {
      errors.desc = "Required";
    }
    return errors;
  };

  const reset = () => formik.resetForm();

  const formik = useFormik({
    initialValues: {
      desc: "",
      postId: post._id,
      username: `${user.name} ${user.surname}`,
    },
    validate,
    onSubmit: (comment) => {
      dispatch(commentPost(comment))
        .unwrap()
        .then((res) => {
          add(res);
          reset();
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
              placeholder={"What's on your mind " + user.name + "?"}
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

export default CommentForm;
