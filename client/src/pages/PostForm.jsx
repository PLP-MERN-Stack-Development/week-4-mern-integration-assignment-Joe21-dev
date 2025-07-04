import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/api/posts/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, content };

    try {
      if (id) await axios.put(`/api/posts/${id}`, data);
      else await axios.post('/api/posts', data);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        value={content}
        placeholder="Content"
        onChange={e => setContent(e.target.value)}
        rows="10"
        required
      ></textarea>
      <button type="submit">{id ? 'Update' : 'Create'} Post</button>
    </form>
  );
};

export default PostForm;
