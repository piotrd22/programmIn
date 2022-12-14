import { useFormik } from "formik";
import { FaSignInAlt } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

function Signin() {
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassw, setErrorPassw] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Required";
    } else if (
      !/(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/.test(
        values.password
      )
    ) {
      errors.password = "Use Stronger Password";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Incorrect email format";
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
    onSubmit: async (user) => {
      await axios
        .post("http://localhost:8080/api/auth/signin", user)
        .then(() => reset())
        .catch((error) => {
          if (error.response.status === 404) {
            setErrorEmail(true);
            setErrorPassw(false);
          } else if (error.response.status === 409) {
            setErrorPassw(true);
            setErrorEmail(false);
          } else alert(error.response);
        });
    },
  });

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
            {formik.errors.email === "Incorrect email format" ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
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
            {formik.errors.password === "Use Stronger Password" ? (
              <div className="error-message">
                {formik.errors.password}
                <p className="error-sub">
                  The password should contain at least 1 capital letter, 1
                  special character, 1 number and be at least 6 characters long
                </p>
              </div>
            ) : null}
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
