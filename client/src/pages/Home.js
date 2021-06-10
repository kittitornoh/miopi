import { useState, useEffect } from 'react';
import axios from 'axios';

// api
import * as API from '../api/api';

// components
import Loading from '../components/Loading';
import PostCard from '../components/PostCard';
import Row from 'react-bootstrap/Row';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    axios.get(API.POSTS).then((response) => {
      setPosts(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Row>
      {isLoading ? (
        <Loading />
      ) : (
        posts.map((post, key) => {
          return <PostCard post={post} key={key} />;
        })
      )}
    </Row>
  );
};

export default Home;
