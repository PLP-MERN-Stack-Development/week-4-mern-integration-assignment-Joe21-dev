import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/posts')
      .then(res => {
        const data = res.data;

        // Check if data is array or an object
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          throw new Error('Unexpected response format');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content.slice(0, 150)}...</p>
            <Link to={`/posts/${post._id}`}>Read more</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
