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

function Profile() {
  const id = useParams().id;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);
  const [postsLen, setPostLen] = useState(0);
  const [curruser, setCurruser] = useState(user);

  useEffect(() => {
    dispatch(userPosts(id))
      .unwrap()
      .then((res) => {
        setPosts(
          res.sort((x, y) => {
            return new Date(y.createdAt) - new Date(x.createdAt);
          })
        );
        setPostLen(res.length);
      })
      .catch((error) => {
        alert(error);
      });
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getUser(id))
      .unwrap()
      .then((res) => {
        setCurruser(res);
      })
      .catch((error) => {
        alert(error);
      });
  }, [id, dispatch]);

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post._id !== id));
  };

  const handleUpdate = (newPost) => {
    setPosts(posts.map((post) => (newPost._id === post._id ? newPost : post)));
  };

  const handleAdd = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div>
      <div className="user">
        <div className="back-photo">
          <div>
            {curruser.backPicture ? (
              <img
                crossOrigin="anonymous"
                className="post-image"
                src={`http://localhost:8080/images/${curruser.backPicture}`}
                alt="CoverPhoto"
              />
            ) : (
              <p>Cover Photo</p>
            )}
          </div>
        </div>
        <div className="profile-photo">
          <div>
            {curruser.profilePicture ? (
              <img
                crossOrigin="anonymous"
                className="post-image"
                src={`http://localhost:8080/images/${curruser.profilePicture}`}
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
              {curruser.name} {curruser.surname}
            </h4>
          </div>
        </div>
        {curruser.description && (
          <div className="desc">
            <div>
              <span>{curruser.description}</span>
            </div>
          </div>
        )}
        <div className="followers">
          <span>Posts {postsLen}</span>
          <span>Followers {curruser.followers.length}</span>
          <span>Following {curruser.following.length}</span>
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
              <span>{curruser.email}</span>
            </li>
            {curruser.githuburl && (
              <li>
                <a href={curruser.githuburl}>
                  <FaGithub />
                  <span>{curruser.githuburl}</span>
                </a>
              </li>
            )}
            <li>
              <FaMapMarkerAlt />
              <span>
                {curruser.nationality} {curruser.city && curruser.city}
              </span>
            </li>
          </ul>
        </div>
        <div className="button">
          <div></div>
        </div>
      </div>
      <div>
        {user._id === id && <PostForm add={handleAdd} />}
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            del={handleDelete}
            update={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
