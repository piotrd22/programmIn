import { userPosts } from "../features/post/postSlice";
import { getUser } from "../features/user/userSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUserAlt,
  FaGithub,
  FaMailBulk,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { TiRefresh } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import Loader from "../components/Loader";

function Profile() {
  const id = useParams().id;
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  const [postsLen, setPostLen] = useState(0);

  useEffect(() => {
    dispatch(userPosts(id))
      .unwrap()
      .then((res) => setPostLen(res.length))
      .catch((error) => {
        alert(error);
      });
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getUser(id))
      .unwrap()
      // .then((res) => {
      //   setCurruser(res);
      // })
      .catch((error) => {
        alert(error);
      });
  }, [id, dispatch]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="user">
        <div className="back-photo">
          <div>
            {user.backPicture ? (
              <img
                crossOrigin="anonymous"
                className="post-image"
                src={`http://localhost:8080/images/${user.backPicture}`}
                alt="CoverPhoto"
              />
            ) : (
              <p>Cover Photo</p>
            )}
          </div>
        </div>
        <div className="profile-photo">
          <div>
            {user.profilePicture ? (
              <img
                crossOrigin="anonymous"
                className="post-image"
                src={`http://localhost:8080/images/${user.profilePicture}`}
                alt="Profile Pic"
              />
            ) : (
              <FaUserAlt />
            )}
          </div>
        </div>
        <div className="name-surname">
          <div>
            <h4>
              {user.name} {user.surname}
            </h4>
          </div>
        </div>
        {user.description && (
          <div className="desc">
            <div>
              <span>{user.description}</span>
            </div>
          </div>
        )}
        <div className="followers">
          <span>Posts {postsLen}</span>
          <span>Followers {user.followers.length}</span>
          <span>Following {user.following.length}</span>
        </div>
        <div className="button">
          {user._id !== id && <button>Follow</button>}
          {user._id === id && (
            <Link to={`/profile/${user._id}/update`}>
              <button>
                <TiRefresh /> Update profile
              </button>
            </Link>
          )}
          <button>More</button>
        </div>
        <div className="info">
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
            <li>
              <FaMapMarkerAlt />
              <span>
                {user.nationality} {user.city && user.city}
              </span>
            </li>
          </ul>
        </div>
        <div className="button">
          <div></div>
        </div>
      </div>
      <div>
        {user._id === id && <PostForm />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
