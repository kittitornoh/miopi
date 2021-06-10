import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

// api
import * as API from '../api/api';

// components
import Loading from '../components/Loading';
import PostCard from '../components/PostCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API.POSTS}/user/${authState.id}`, {
        headers: { 'access-token': localStorage.getItem('access-token') },
      })
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      });
  }, [authState]);

  return (
    <>
      <Row className='mb-3'>
        <Col sm={12}>
          <h2>{authState.name}</h2>
        </Col>
      </Row>
      <Row>
        {isLoading ? (
          <Loading />
        ) : (
          posts.map((post, key) => {
            return <PostCard post={post} key={key} />;
          })
        )}
      </Row>
    </>
  );
};

export default Profile;
