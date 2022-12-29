import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../features/user/userSlice";
import {
  FaUserAlt,
  FaGithub,
  FaMailBulk,
  FaPhone,
  FaBirthdayCake,
  FaTransgenderAlt,
} from "react-icons/fa";
import Loader from "../components/Loader";

function More() {
  const id = useParams().id;
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(id))
      .unwrap()
      .catch((error) => {
        alert(error);
      });
  }, [id, dispatch]);

  if (isLoading) return <Loader />;

  return (
    <div className="form">
      <section className="heading">
        <h1>
          <FaUserAlt /> More about {user.name} {user.surname}
        </h1>
      </section>

      <section>
        {user.description && (
          <div className="more">
            <label>Description</label>
            <span>{user.description}</span>
          </div>
        )}
        {user.city ? (
          <div className="more">
            <label>Place of residence</label>
            <span>
              {user.nationality}, {user.city}
            </span>
          </div>
        ) : (
          <div className="more">
            <label>Place of residence</label>
            <span>{user.nationality}</span>
          </div>
        )}
        <div className="more more-ul">
          <label>Contact information</label>
          <ul>
            <li>
              <FaMailBulk />
              <span>{user.email}</span>
            </li>
            {user.githuburl && (
              <li>
                <a href={user.githuburl}>
                  <FaGithub />
                  <span>{user.githuburl}</span>
                </a>
              </li>
            )}
            {user.phone && (
              <li>
                <FaPhone />
                <span>{user.phone}</span>
              </li>
            )}
          </ul>
        </div>
        <div className="more more-ul">
          <label>Info</label>
          <ul>
            <li>
              <FaTransgenderAlt />
              <span>{user.gender}</span>
            </li>
            {user.date && (
              <li>
                <FaBirthdayCake />
                <span>{user.date.slice(0, 10)}</span>
              </li>
            )}
          </ul>
        </div>
        {user.experience && (
          <div className="more">
            <label>Experience</label>
            <span>{user.experience}</span>
          </div>
        )}
        {user.skills && (
          <div className="more">
            <label>Skills</label>
            <span>{user.skills}</span>
          </div>
        )}
        {user.education && (
          <div className="more">
            <label>Education</label>
            <span>{user.education}</span>
          </div>
        )}
      </section>
    </div>
  );
}

export default More;
