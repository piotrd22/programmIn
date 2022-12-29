import { useFormik } from "formik";
import { countryList } from "../assets/Countries";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Signup() {
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const checkingDate = (date) => {
    const data_arr = date.split("-");
    const today = new Date();
    if (
      today.getFullYear() >= +data_arr[0] &&
      today.getMonth() + 1 >= +data_arr[1] &&
      today.getDate() > +data_arr[2]
    ) {
      return true;
    } else return false;
  };

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

    if (!values.date) {
      errors.date = "Required";
    }

    if (values.date) {
      if (!checkingDate(values.date)) {
        errors.date = "The date cannot be later than today!";
      } else {
        errors.date = "";
      }
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (
      !/(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/.test(
        values.password
      )
    ) {
      errors.password = "Use stronger password";
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
    setError(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      date: "",
      gender: "",
      nationality: "",
      checkbox: false,
    },
    validate,
    onSubmit: (user) => {
      dispatch(signup(user))
        .unwrap()
        .then(() => {
          reset();
          navigate("/");
        })
        .catch((error) => {
          const arr = error.message.split(" ");
          const res_status = arr[arr.length - 1];
          if (res_status === "405") setError(true);
          else alert(error.message);
        });
    },
  });

  if (isLoading) return <Loader />;

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
            {formik.errors.email === "Incorrect email format" ? (
              <div className="error-message">
                {formik.errors.email}
                <p className="error-sub">Check entered email</p>
              </div>
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
            {formik.errors.password === "Use stronger password" ? (
              <div className="error-message">
                {formik.errors.password}
                <p className="error-sub">
                  The password should contain at least 1 capital letter, 1
                  special character, 1 number and be at least 6 characters long
                </p>
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="date">Date of Birth*</label>
            <input
              id="date"
              name="date"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
          </div>
          {formik.errors.date === "The date cannot be later than today!" ? (
            <div className="error-message">
              {formik.errors.date}
              <p className="error-sub">Check entered date</p>
            </div>
          ) : null}
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
          {error && (
            <div className="error-message">Email is already taken !</div>
          )}
          <button
            className="btn btn-block"
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
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
