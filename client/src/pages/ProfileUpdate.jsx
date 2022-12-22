import { useFormik } from "formik";
import { countryList } from "../assets/Countries";
import { FaUserAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getUser, deleteUser } from "../features/user/userSlice";
import { logout } from "../features/auth/authSlice";
import Loader from "../components/Loader";
import axios from "axios";

function ProfileUpdate() {
  const id = useParams().id;
  const { user, isLoading } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);
  const [fileback, setFileback] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser(id))
      .unwrap()
      .catch((error) => {
        alert(error);
      });
  }, [id, dispatch]);

  const validate = (values) => {
    const errors = {};

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

    if (values.password) {
      if (
        !/(?=^.{6,}$)(?=.[0-9])(?=.[A-Z])(?=.[a-z])(?=.[^A-Za-z0-9])./.test(
          values.password
        )
      ) {
        errors.password = "Use stronger password";
      }
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Incorrect email format";
    }

    return errors;
  };

  const initialState = {
    _id: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: "",
    gender: user.gender,
    nationality: user.nationality,
    experience: user.experience,
    skills: user.skills,
    education: user.education,
    city: user.city,
    description: user.description,
    githuburl: user.githuburl,
    profilePicture: "",
    backPicture: "",
  };

  const valueToSubmitChecker = (initialState, user) => {
    const newuser = user;
    const keys = Object.keys(initialState);

    keys.forEach((key) => {
      if (initialState[key] === newuser[key] && key !== "_id")
        delete newuser[key];
    });

    return newuser;
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    formik.handleChange(e);
  };

  const onChangeBack = (e) => {
    setFileback(e.target.files[0]);
    formik.handleChange(e);
  };

  const update = (userToSubmit) => {
    dispatch(updateUser(userToSubmit))
      .unwrap()
      .then(() => {
        navigate(`/profile/${userToSubmit._id}`);
        refreshPage();
      })
      .catch((error) => {
        const error_array = error.split(" ");
        const status = error_array[error_array.length - 1];
        if (status === "405") setError(true);
        else alert(error);
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialState,
    validate,
    onSubmit: async (user) => {
      const userToSubmit = valueToSubmitChecker(initialState, user);
      if (file && fileback) {
        const data = new FormData();
        const postName = Date.now() + file.name;
        data.append("name", postName);
        data.append("file", file);
        user.profilePicture = postName;

        const data2 = new FormData();
        const postName2 = Date.now() + fileback.name;
        data2.append("name", postName);
        data2.append("file", fileback);
        user.backPicture = postName2;
        try {
          await axios.post("http://localhost:8080/api/upload/", data);
          await axios.post("http://localhost:8080/api/upload/", data2);
        } catch (error) {
          alert(error);
        }
        update(userToSubmit);
      } else if (file) {
        const data = new FormData();
        const postName = Date.now() + file.name;
        data.append("name", postName);
        data.append("file", file);
        user.profilePicture = postName;
        try {
          await axios.post("http://localhost:8080/api/upload/", data);
        } catch (error) {
          alert(error);
        }
        update(userToSubmit);
      } else if (fileback) {
        const data = new FormData();
        const postName = Date.now() + fileback.name;
        data.append("name", postName);
        data.append("file", fileback);
        user.backPicture = postName;
        try {
          await axios.post("http://localhost:8080/api/upload/", data);
        } catch (error) {
          alert(error);
        }
        update(userToSubmit);
      } else {
        update(userToSubmit);
      }
    },
  });

  const genderList = ["male", "female", "other"];

  const refreshPage = () => window.location.reload();

  const deleteAccount = () => {
    dispatch(deleteUser(user))
      .unwrap()
      .then(() => {
        navigate("/");
        dispatch(logout());
        refreshPage();
      })
      .catch((error) => {
        alert(error);
      });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="ProfileUpdate">
      <section className="heading">
        <h1>
          <FaUserAlt /> Update Your Profile
        </h1>
      </section>

      <section className="form">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="surname">Surname</label>
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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
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
            <label htmlFor="gedner">Gender</label>
            <select
              name="gender"
              id="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <option label="Select gender" />
              {genderList.map((gender, index) => {
                if (gender === user.gender) {
                  return (
                    <option
                      value={gender}
                      defaultValue
                      name="gender"
                      id="gender"
                      key={index}
                    >
                      {gender}
                    </option>
                  );
                } else {
                  return (
                    <option
                      value={gender}
                      name="gender"
                      id="gender"
                      key={index}
                    >
                      {gender}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <select
              value={formik.values.nationality}
              onChange={formik.handleChange}
              name="nationality"
              id="nationality"
            >
              <option label="Select nationality" />
              {countryList.map((country, index) => {
                if (country === user.nationality) {
                  return (
                    <option
                      value={country}
                      defaultValue
                      name="nationality"
                      id="nationality"
                      key={index}
                    >
                      {country}
                    </option>
                  );
                } else {
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
                }
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="city">City And Postal Code</label>
            <input
              id="city"
              name="city"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Experience</label>
            <textarea
              id="experience"
              name="experience"
              type="experience"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.experience}
            />
          </div>
          <div className="form-group">
            <label htmlFor="skills">Skills</label>
            <textarea
              id="skills"
              name="skills"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.skills}
            />
          </div>
          <div className="form-group">
            <label htmlFor="githuburl">Github</label>
            <input
              id="githuburl"
              name="githuburl"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.githuburl}
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Education</label>
            <textarea
              id="education"
              name="education"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.education}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              onChange={onChange}
              onBlur={formik.handleBlur}
              value={formik.values.profilePicutre}
            />
          </div>
          <div className="form-group">
            <label htmlFor="coverPicture">Cover Picture</label>
            <input
              id="coverPicture"
              name="coverPicture"
              type="file"
              onChange={onChangeBack}
              onBlur={formik.handleBlur}
              value={formik.values.coverPicutre}
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
        </form>
      </section>
      <section className="form">
        <h4>Delete account</h4>
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button className="btn btn-block" onClick={deleteAccount}>
          Delete your account
        </button>
      </section>
    </div>
  );
}

export default ProfileUpdate;
