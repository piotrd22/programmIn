import { userPosts } from "../features/post/postSlice";
import { getUser, followUser, unfollowUser } from "../features/user/userSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiRefresh } from "react-icons/ti";
import { Link, useParams } from "react-router-dom";
import Post from "../components/Post";
import Loader from "../components/Loader";
import profile from "../assets/profile.png";
import back from "../assets/back.png";
import PostForm from "../components/PostForm";

function Profile() {
  const id = useParams().id;
  const dispatch = useDispatch();
  const { user: curruser } = useSelector((state) => state.auth);
  const { user, isLoading } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  const [followersLen, setFollowersLen] = useState(0);
  const [followingLen, setFollowingLen] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    dispatch(userPosts(id))
      .unwrap()
      .catch((error) => {
        alert(error);
      });
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getUser(id))
      .unwrap()
      .then((res) => {
        setFollowersLen(res.followers.length);
        setFollowingLen(res.following.length);
      })
      .catch((error) => {
        alert(error);
      });
  }, [id, dispatch]);

  useEffect(() => {
    setIsFollowed(user.followers.includes(curruser._id));
  }, [curruser._id, user.followers]);

  const followHandler = () => {
    if (isFollowed) {
      dispatch(unfollowUser(user))
        .unwrap()
        .then(() => {
          setFollowersLen(followersLen - 1);
          setIsFollowed(!isFollowed);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      dispatch(followUser(user))
        .unwrap()
        .then(() => {
          setFollowersLen(followersLen + 1);
          setIsFollowed(!isFollowed);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

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
              <img className="post-image" src={back} alt="CoverPhoto" />
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
              <img className="post-image" src={profile} alt="CoverPhoto" />
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
          <Link to={`/profile/${user._id}/followers`}>
            Followers {followersLen}
          </Link>
          <Link to={`/profile/${user._id}/followings`}>
            Following {followingLen}
          </Link>
        </div>
        <div className="button">
          {curruser._id !== id &&
            (isFollowed ? (
              <button className="btn-follow" onClick={followHandler}>
                Unfollow
              </button>
            ) : (
              <button className="btn-unfollow" onClick={followHandler}>
                Follow
              </button>
            ))}
          {curruser._id === id && (
            <Link to={`/profile/${user._id}/update`}>
              <button className="btn-follow">
                <TiRefresh /> Update profile
              </button>
            </Link>
          )}
          <Link to={`/profile/${user._id}/more`}>
            <button className="btn-follow">More</button>
          </Link>
        </div>
      </div>
      <div>
        {curruser._id === user._id && <PostForm />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
