import { useState, useEffect } from 'react';
import axios from 'axios';

// api
import * as API from '../api/api';

// components
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(API.POSTS).then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div>
      {posts.map((post, key) => {
        return <PostCard post={post} key={key} />;
      })}
    </div>
  );
};

export default Home;
