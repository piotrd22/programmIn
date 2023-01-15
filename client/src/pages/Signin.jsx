import { useFormik } from "formik";
import { FaSignInAlt } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Signin() {
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassw, setErrorPassw] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    }
    return errors;
  };

  const reset = () => {
    formik.resetForm();
    setErrorEmail(false);
    setErrorPassw(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (user) => {
      dispatch(signin(user))
        .unwrap()
        .then(() => {
          reset();
          navigate("/feed");
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              setErrorEmail(true);
              setErrorPassw(false);
            } else if (error.response.status === 409) {
              setErrorPassw(true);
              setErrorEmail(false);
            }
          } else alert(error);
        });
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="Signin">
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login</p>
      </section>

      <section className="form">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          {errorEmail && <div className="error-message">User not found</div>}
          {errorPassw && <div className="error-message">Wrong password</div>}
          <button
            className="btn btn-block"
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

export default Signin;
