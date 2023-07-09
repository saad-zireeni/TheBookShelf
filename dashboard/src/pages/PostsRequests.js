import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function PostsRequests() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("http://localhost:5000/postsRequest")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAccept = (post_id) => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to accept this post?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Accept",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:5000/postsAccept/${post_id}`)
          .then((response) => {
            fetchPosts();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReject = async (id) => {
    try {
      const { value: reason } = await Swal.fire({
        title: "Enter the reason for rejection:",
        input: "text",
        inputPlaceholder: "Enter the reason here...",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Reject",
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
          if (inputValue) {
            return axios
              .put(`http://localhost:5000/postsReject/${id}`, {
                reason: inputValue,
              })
              .then(() => {
                setPosts((prevPosts) =>
                  prevPosts.filter((item) => item.post_id !== id)
                );
                return inputValue;
              })
              .catch((error) => {
                console.log("Error rejecting request:", error);
                Swal.showValidationMessage(
                  "Failed to reject the post request."
                );
              });
          } else {
            Swal.showValidationMessage(
              "Please enter the reason for rejection."
            );
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (reason) {
        Swal.fire(
          "Success",
          `The post request has been rejected. Reason: ${reason}`,
          "success"
        );
      }
    } catch (error) {
      console.log("Error rejecting request:", error);
      Swal.fire("Error", "Failed to reject the post request.", "error");
    }
  };

  function convertDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className="container mx-auto mt-5 px-4 max-h-full">
      {currentPosts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No post requests available</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentPosts.map((post) => (
              <div
                key={post.post_id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={post.profileImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <span className="text-gray-800 font-bold">
                    {post.username}
                  </span>
                </div>
                <span className="text-gray-800 mt-3 font-bold">
                  {convertDate(post.created_at)}
                </span>

                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="flex justify-center">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleAccept(post.post_id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => handleReject(post.post_id)}
                  >
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {posts.length > postsPerPage && (
              <ul className="pagination flex">
                {Array.from(
                  { length: Math.ceil(posts.length / postsPerPage) },
                  (_, index) => (
                    <li
                      key={index}
                      className={`${currentPage === index + 1 ? "active" : ""}`}
                    >
                      <button
                        onClick={() => paginate(index + 1)}
                        className="pagination-link mb-3 mt-8 me-3 pt-3 pb-3"
                        style={{
                          border: "1px solid black",
                          borderRadius: "100%",
                          paddingRight: "17px",
                          paddingLeft: "17px",
                        }}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default PostsRequests;
