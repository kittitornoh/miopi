import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// api
import * as API from '../api/api';

// context
import { AuthContext } from '../auth/AuthContext';

// components
import Loading from '../components/Loading';
import PostCard from '../components/PostCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Home = () => {
  let history = useHistory();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);

    axios.get(API.POSTS).then((response) => {
      setPosts(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {authState.isAuth && (
        <Row className='mb-3'>
          <Col sm={12} className='d-flex justify-content-end'>
            <Button onClick={() => history.push('/newPost')}>New Post</Button>
          </Col>
        </Row>
      )}
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

export default Home;
