import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../features/post/postSlice";
import { useState } from "react";
import axios from "axios";

function PostUpdateForm({ post }) {
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

  const refreshPage = () => window.location.reload(false);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    formik.handleChange(e);
  };

  const formik = useFormik({
    initialValues: {
      _id: post._id,
      image: "",
      desc: post.desc,
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
          await axios.post("api/upload/", data);
        } catch (error) {
          alert(error);
        }
        dispatch(updatePost(post))
          .unwrap()
          .then(() => {
            refreshPage();
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        dispatch(updatePost(post))
          .unwrap()
          .then(() => {
            refreshPage();
          })
          .catch((error) => {
            alert(error);
          });
      }
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
          <button className="btn-post" type="submit">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default PostUpdateForm;
