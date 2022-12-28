import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/post/postSlice";
import { useState } from "react";
import axios from "axios";

function PostForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);

  const validate = (values) => {
    const errors = {};

    if (!values.desc) {
      errors.desc = "Required";
    }
    return errors;
  };

  const reset = () => formik.resetForm();

  const makePost = (post) => {
    dispatch(createPost(post))
      .unwrap()
      .then(() => reset())
      .catch((error) => {
        alert(error);
      });
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    formik.handleChange(e);
  };

  const formik = useFormik({
    initialValues: {
      image: "",
      desc: "",
    },
    validate,
    onSubmit: async (post) => {
      if (file) {
        const data = new FormData();
        const postName = Date.now() + file.name;
        data.append("name", postName);
        data.append("file", file);
        post.image = postName;
        try {
          await axios.post("http://localhost:8080/api/upload/", data);
        } catch (error) {
          alert(error);
        }
        makePost(post);
      } else {
        makePost(post);
      }
    },
  });

  return (
    <div>
      <section className="form-post">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group-post">
            <textarea
              placeholder={"What's on your mind " + user.name + "?"}
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
              className="input-post"
              type="file"
              name="image"
              id="image"
              accept=".png, .jpg, .jpeg"
              onChange={onChange}
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
          <button className="btn-post" type="button" onClick={reset}>
            Reset
          </button>
        </form>
      </section>
    </div>
  );
}

export default PostForm;
