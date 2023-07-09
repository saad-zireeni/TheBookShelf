import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    created_at: new Date().toISOString().split("T")[0],
  });
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();




  /////////////////////////
  const [user_id, setUser_id] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.user_id;
        setUser_id(id);
        setIsLoggedIn(true);

      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);
  /////////////////////////

  // Fetch All Posts From the DB
  const fetchBlogPosts = () => {
    axios
      .get("http://localhost:5000/getAllPosts")
      .then((response) => {
        const posts = response.data;
        setBlogPosts(posts);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
      });
  };

  // Set the FormData to the data entered by the user
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle the creation of the new post
  const handleCreatePost = (user_id) => {
    const newPost = {
      user_id: user_id,
      ...formData,
    };

    newPost.date = new Date(newPost.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    Swal.fire({
      title: "Create Post",
      text: "Are you sure you want to create this post?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Create",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:5000/createPost", newPost)
          .then((response) => {
            Swal.fire({
              title: "Success",
              text: "Post created successfully!",
              icon: "success",
            });

            setShowForm(false); // Close the form
            setFormData({
              title: "",
              content: "",
              created_at: new Date().toISOString().split("T")[0],
            });
            fetchBlogPosts(); // Refetch the posts
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "Error",
              text: "An error occurred while creating the post.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  // Call the fetchBlogPosts function when the component mounts
  useEffect(() => {
    fetchBlogPosts();
  }, []);


  function convertDate(timestamp) {

    const date = new Date(timestamp);
    return date.toLocaleDateString();

  }






  return (
    <>
      <div
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url(https://www.scottleroymarketing.com/wp-content/uploads/2016/06/coffee.jpg)`,
          height: "500px",
        }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>

            <nav className="text-white mb-8">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link to="/" className="text-amber-500">
                    Home
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mx-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </li>
                <li className="text-white">Blog</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {blogPosts.length === 0 ? (
        <div className="flex items-center justify-center mt-10">
          <p className="text-2xl text-gray-600 m-10">No posts yet , take the initiative to add one</p>

        </div>
      ) : (
        <div className="grid gap-8 sm:gap-16 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mb-10 mx-6 mt-5 me-5 m-5" >
          {blogPosts.map((post) => (
            <div
              key={post.post_id}
              className="group relative -mx-4 sm:-mx-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-transparent border border-gray-400 hover:border-gray-100 dark:shadow dark:hover:border-gray-700 dark:hover:bg-gray-800 shadow-2xl shadow-black hover:shadow-gray-600/10 sm:gap-8 sm:flex transition duration-300 hover:z-10 mb-4 m-8"
              style={{ boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
            >

              <div className="sm:w-2/6 rounded-3xl overflow-hidden transition-all duration-500 group-hover:rounded-xl">
                <img
                  src="https://media.istockphoto.com/id/1326409389/vector/new-blog-post-origami-style-speech-bubble-banner-sticker-design-template-with-new-blog-post.jpg?s=612x612&w=0&k=20&c=s9FKf7LkahjhvHLfTvtRBMCe_vso8TrH3BO-9e2QrIY="
                  alt="art cover"
                  loading="lazy"
                  width={1000}
                  height={667}
                  className="h-56 sm:h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="sm:p-2 sm:pl-0 sm:w-4/6 text-left">
                <h2 className="text-```jsx
                   2xl font-semibold text-gray-800 dark:text-white mb-2" style={{ fontSize: "30px" }}>
                  {post.title}
                </h2>
                <span className="text-white mt-3">{convertDate(post.created_at)}</span>
                <p className="my-6 text-gray-600 dark:text-gray-300">
                  {post.content.length > 100
                    ? `${post.content.slice(0, 50)}...`
                    : post.content}
                </p>

                <span className="mt-4 mb-2 inline-block font-medium text-gray-400 dark:text-gray-500 sm:mt-0">
                  {post.date}
                </span>

                <div className="flex items-center justify-between">
                  <div>
                    <img
                      src={post.profile_picture}
                      alt="User"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="text-gray-500 text-sm">
                      {post.username}
                    </span>
                  </div>
                  <div>
                    <Link to={`/postdetails/${post.post_id}`}>
                      <button className=" buttonInAddArticle bg-blue-500 hover:bg-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        More Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

<div className="flex items-center justify-center mt-8">
      {isLoggedIn ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full focus:outline-none focus:shadow-outline z-50"
          style={{
            backgroundColor: "#fff",
            color: "rgb(17, 24, 39)",
            border: "1px solid gray",
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: "4rem",
            height: "4rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "0.75rem",
            paddingRight: "0.5rem",
            zIndex: "50",
          }}
        >
          <span>Add Post</span>
        </button>
      ) : (
        <button
          onClick={() =>
            Swal.fire({
              title: "Login Required",
              text: "Please log in to add a post.",
              icon: "info",
              showCancelButton: true,
              confirmButtonText: "Login",
              cancelButtonText: "Cancel",
              reverseButtons: true,
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/LogIn");
              }
            })
          }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full focus:outline-none focus:shadow-outline z-50"
          style={{
            backgroundColor: "#fff",
            color: "rgb(17, 24, 39)",
            border: "1px solid gray",
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: "4rem",
            height: "4rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "0.75rem",
            paddingRight: "0.5rem",
            zIndex: "50",
          }}
      > Add post </button>
      )}
    </div>


      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full mt-5 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-md z-50 max-w-md w-full animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-left">
              Create New Blog Post
            </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2 text-left"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-gray-700 font-bold mb-2 text-left"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleCreatePost(user_id)}
                  style={{ backgroundColor: "rgb(17, 24, 39)" }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Post
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{ backgroundColor: "rgb(17, 24, 39)" }}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;