import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function UserPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwt_decode(token) : null;
    const user_id = decodedToken?.user_id;

    axios
      .get(`http://localhost:5000/userPostsInProfile/${user_id}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  function getColorForStatus(status) {
    switch (status) {
      case 'pending':
        return 'gray';
      case 'rejected':
        return 'red';
      case 'accepted':
        return 'green';
      default:
        return 'black';
    }
  }

  function convertDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

  return (
    <>
      <h1 className='text-center m-10 text-white' style={{fontSize:"20px"}}>" My Posts "</h1>


      <div className="user-posts m-10 text-left flex flex-wrap gap-4">
        {posts.map((post) => (
          <div className="post-card w-80 p-4 bg-white rounded-lg shadow-lg hover:translate-y-[-5px] transition-transform duration-300 ease-in-out" key={post.post_id}>
            <div className="post-header flex items-center mb-2">
              <img
                src={post.profile_picture}
                alt="User"
                className="avatar w-10 h-10 rounded-full object-cover mr-2"
              />
              <div>
                <span className="username font-bold text-black">{post.username}</span>
                <span className="created-at text-xs text-gray-500 block">{convertDate(post.created_at)}</span>
              </div>
            </div>
            <h2 className="text-black text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-black">{post.content}</p>
            {post.post_status === 'rejected' && (
              <span
                className="status rejected font-bold text-red-500"
                style={{ color: getColorForStatus(post.post_status) }}
              >
                {post.post_status}
                <p className="text-black">The reason is: {post.rejection_reason}</p>
              </span>
            )}
            {post.post_status !== 'rejected' && (
              <span
                className="status font-bold"
                style={{ color: getColorForStatus(post.post_status) }}
              >
                {post.post_status}
              </span>
            )}
          </div>
        ))}
      </div>
    </>

  );
}

export default UserPosts;