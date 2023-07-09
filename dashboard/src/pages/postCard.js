import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const PostCard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/getPostsDeleteAdmin"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:5000/DeletePostsAdmin/${postId}`
          );
          const updatedPosts = posts.filter((post) => post.post_id !== postId);
          setPosts(updatedPosts);
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting post:", error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the post.",
            "error"
          );
        }
      }
    });
  };

  function convertDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className="m-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <div
          key={post.post_id}
          className="p-4 bg-white rounded-md shadow-md hover:shadow-lg transition duration-300"
        >
          <div className="flex items-center mb-2">
            <img
              src={post.profile_picture}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-bold text-gray-700">{post.username}</span>
          </div>
          <div className="text-gray-500 text-sm mb-2">
            {convertDate(post.created_at)}
          </div>
          <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
          <p className="text-gray-800">{post.content}</p>
          <button
            className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none"
            onClick={() => handleDelete(post.post_id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
