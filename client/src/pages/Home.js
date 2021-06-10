import { useState, useEffect } from 'react';
import axios from 'axios';

// api
import * as API from '../api/api';

// components
import PostCard from '../components/PostCard';
import Row from 'react-bootstrap/Row';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(API.POSTS).then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <Row>
      {posts.map((post, key) => {
        return <PostCard post={post} key={key} />;
      })}
    </Row>
  );
};

export default Home;
