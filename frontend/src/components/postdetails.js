/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AddComments from "./addcomments";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

function PostDetails() {
  const navigate = useNavigate();
  const { post_id } = useParams();
  const [post, setPost] = useState();
  const [userPosted, setUserPosted] = useState(false);

  const fetchBlogPost = () => {
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwt_decode(token) : null;
    const user_id = decodedToken?.user_id;

    axios
      .get(`http://localhost:5000/getPostById/${post_id}`)
      .then((response) => {
        const result = response.data;
        setPost(result);
        setUserPosted(result.user_id === user_id);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
      });
  };

  useEffect(() => {
    fetchBlogPost();
  }, []);

  const deletePost = () => {
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwt_decode(token) : null;
    const user_id = decodedToken?.user_id;

    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete the post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/deletePost/${post_id}/${user_id}`)
          .then(() => {
            console.log("Post deleted successfully");
            Swal.fire("Deleted!", "The post has been deleted.", "success");
            setPost(null); // Remove the post from the state
            navigate("/blog");
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
            Swal.fire(
              "Error",
              "An error occurred while deleting the post.",
              "error"
            );
          });
      }
    });
  };

  function convertDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <>
      <section
        className="overflow-hidden text-gray-100 mt-10"
        style={{ backgroundColor: "#111827" }}
      >
        {post && (
          <div className="container px-5 pt-32 pb-4 mx-auto sm:py-24">
            <div
              className="flex flex-wrap items-center mx-auto lg:max-w-5xl shadow-md rounded-lg p-8 hover:shadow-lg relative"
              style={{ boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)" }}
            >
              <div className="w-full text-left mt-6 lg:w-full lg:pl-10 py-0 lg:mt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={post.profile_picture}
                      alt="User"
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <h2 className="text-lg font-medium text-gray-100">
                      {post.username}
                      <p
                        className="text-gray-300 mb-4"
                        style={{ fontSize: "13px" }}
                      >
                        {convertDate(post.created_at)}
                      </p>
                    </h2>
                  </div>
                  <button
                    className="text-gray-300 hover:text-white absolute me-3 top-2 right-2"
                    onClick={deletePost}
                    style={{
                      display: userPosted ? "block" : "none",
                      color: "red",
                    }}
                  >
                    X
                  </button>
                </div>
                <h1 className="text-3xl font-medium text-gray-100 title-font mb-8">
                  {post.title}
                </h1>
                <p className="leading-relaxed">{post.content}</p>
              </div>
            </div>
            <div>
              <AddComments post_id={post.post_id} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default PostDetails;
