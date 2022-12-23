import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../features/user/userSlice";
import { FaUserAlt } from "react-icons/fa";
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
          <div className="form-group">
            <label>Description</label>
            <span>{user.description}</span>
          </div>
        )}
      </section>
    </div>
  );
}

export default More;
