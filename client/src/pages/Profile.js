import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

// api
import * as API from '../api/api';

// components
import PostCard from '../components/PostCard';
import Row from 'react-bootstrap/Row';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API.POSTS}/user/${authState.id}`, {
        headers: { 'access-token': localStorage.getItem('accessToken') },
      })
      .then((response) => {
        setPosts(response.data);
      });
  }, [authState]);

  return (
    <Row>
      {posts.map((post, key) => {
        return <PostCard post={post} key={key} />;
      })}
    </Row>
  );
};

export default Profile;
