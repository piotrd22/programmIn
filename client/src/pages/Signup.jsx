import { useFormik } from "formik";
import { countryList } from "../assets/Countries";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";

function Signup() {
  const validate = (values) => {
    const errors = {};

    if (values.checkbox === false) {
      errors.checkbox = "Required";
    }

    if (!values.nationality) {
      errors.nationality = "Required";
    }

    if (!values.gender) {
      errors.gender = "Required";
    }

    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.surname) {
      errors.surname = "Required";
    }

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
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const reset = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      gender: "",
      nationality: "",
      checkbox: false,
    },
    validate,
    onSubmit: async (user) => {
      try {
        await axios.post("http://localhost:8080/api/auth/signup", user);
        reset()
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="signup">
      <section className="heading">
        <h1>
          <FaUserAlt /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname*</label>
            <input
              id="surname"
              name="surname"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.surname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email === "Invalid email address" ? (
              <div>{formik.errors.email}</div>
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
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form-group">
            <fieldset>
              <legend>Select gender*</legend>
              <div>
                <input
                  type="radio"
                  id="gender"
                  name="gender"
                  value="male"
                  checked={formik.values.gender === "male"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="male">Male</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="gedner"
                  name="gender"
                  value="female"
                  checked={formik.values.gender === "female"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="female">Female</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="gedner"
                  name="gender"
                  value="other"
                  checked={formik.values.gender === "other"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="other">Other</label>
              </div>
            </fieldset>
          </div>
          <div className="form-group">
            <select
              value={formik.values.nationality}
              onChange={formik.handleChange}
              name="nationality"
              id="nationality"
            >
              <option label="Select nationality*" />
              {countryList.map((country, index) => {
                return (
                  <option
                    value={country}
                    name="nationality"
                    id="nationality"
                    key={index}
                  >
                    {country}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="checkbox">
            <label htmlFor="checkbox">Accept all terms*</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.checkbox}
              checked={formik.values.checkbox}
              type="checkbox"
              name="checkbox"
              id="checkbox"
            />
          </div>
          <button
            className="btn btn-block"
            type="submit"
            disabled={!formik.isValid}
          >
            Submit
          </button>
          <button className="btn btn-block" type="button" onClick={reset}>
            Reset
          </button>
        </form>
      </section>
    </div>
  );
}

export default Signup;
