import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../features/post/postSlice";

function CommentForm({ post }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const validate = (values) => {
    const errors = {};

    if (!values.desc) {
      errors.desc = "Required";
    }
    return errors;
  };

  const refreshPage = () => window.location.reload(false);

  const formik = useFormik({
    initialValues: {
      desc: "",
      postId: post._id,
    },
    validate,
    onSubmit: (comment) => {
      dispatch(commentPost(comment))
        .unwrap()
        .then(() => {
          refreshPage();
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
              placeholder={"What's in your mind " + user.name + "?"}
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
