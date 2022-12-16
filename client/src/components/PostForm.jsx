import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/post/postSlice";

function PostForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const validate = (values) => {
    const errors = {};

    if (!values.desc) {
      errors.name = "Required";
    }
    return errors;
  };

  const reset = () => formik.resetForm();

  const refreshPage = () => window.location.reload(false);

  const formik = useFormik({
    initialValues: {
      image: "",
      desc: "",
    },
    validate,
    onSubmit: (post) => {
      dispatch(createPost(post))
        .unwrap()
        .then(() => {
          reset();
          refreshPage();
        })
        .catch((error) => {
          alert(error);
        });
    },
  });

  return (
    <div>
      <section className="form-post">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group-post">
            <textarea
              placeholder={"What's in your mind " + user.name + "?"}
              type="text"
              name="desc"
              id="desc"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.desc}
            />
          </div>
          <div className="form-group-post">
            <input
              className="input-file"
              type="file"
              name="image"
              id="image"
              accept=".png, .jpg, .jpeg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.image}
            />
          </div>
          <button
            className="btn-post"
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default PostForm;
