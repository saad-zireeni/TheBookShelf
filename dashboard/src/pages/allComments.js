import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function AllComments() 
{

  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/getAllcomments")
      .then((response) => {
        setCommentList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  const handleDeleteComment = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Send delete request to API
        axios
          .delete(`http://localhost:5000/DeleteComments/${commentId}`)
          .then(() => {
            const updatedCommentList = commentList.filter(
              (comment) => comment.comment_id !== commentId
            );
            setCommentList(updatedCommentList);

            Swal.fire("Deleted!", "Your comment has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting comment:", error);
          });
      }
    });
  };



  return (
    <>
      <div className="flex flex-wrap justify-center">
        {commentList.map((comment) => (
          <div
            key={comment.comment_id}
            className="m-5 p-7 flex items-center border p-4 shadow-md transition duration-300 ease-in-out w-96 hover:shadow-lg"
          >
            <img
              src={comment.profile_picture}
              alt={comment.username}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h4 className="font-bold">{comment.username}</h4>
              <p className="text-left">{comment.content}</p>
              <button
                className="mt-5 bg-red-500 hover:bg-red-600 text-white px-2 py-1 mt-2 rounded"
                onClick={() => handleDeleteComment(comment.comment_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllComments;