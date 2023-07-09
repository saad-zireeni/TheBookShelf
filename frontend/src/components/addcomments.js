import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
} from "@material-tailwind/react";
import jwtDecode from "jwt-decode";

function AddComments({ post_id }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentToUpdate, setCommentToUpdate] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
const navigate =useNavigate();
  //////////////////
  const [user_id, setUser_id] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.user_id;
        setUser_id(id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);
  //////////////////

  const getComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getPostComments/${post_id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getComments();
  }, [post_id]);

  const postComment = async () => {
    try {
      if (!user_id) {
        Swal.fire({
          title: "User Not Registered",
          text: "Please register or log in to post a comment.",
          icon: "warning",
          confirmButtonText: "Log In",
        }).then((result) => {
          if (result.isConfirmed) {
          navigate('/LogIn');
          }
        });
        return;
      }
  
      const comment = {
        content: newComment,
        user_id: user_id,
      };
  
      const response = await axios.post(
        `http://localhost:5000/postComments/${post_id}/comments`,
        comment
      );
      setComments([...comments, response.data]);
      setNewComment("");
      getComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      return;
    }
    postComment();
  };

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
        try {
          axios
            .delete(
              `http://localhost:5000/DeleteComments/${commentId}/${user_id}`
            )
            .then(() => {
              const updatedCommentList = comments.filter(
                (comment) => comment.comment_id !== commentId
              );
              setComments(updatedCommentList);
              getComments();
              Swal.fire(
                "Deleted!",
                "Your comment has been deleted.",
                "success"
              );
            })
            .catch((error) => {
              console.error("Error deleting comment:", error);
            });
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      }
    });
  };

  const handleUpdateComment = (event) => {
    const value = event.target.value;
    setUpdatedComment(value);
  };

  const handleEditForm = async (event) => {
    event.preventDefault();
    try {
      const updatedComments = comments.map((comment) => {
        if (comment.comment_id === selectedCommentId) {
          return {
            ...comment,
            content: updatedComment,
          };
        }
        return comment;
      });

      const response = await axios.patch(
        `http://localhost:5000/UpdateComments/${selectedCommentId}`,
        { content: updatedComment }
      );

      if (response.status === 200) {
        setComments(updatedComments);
        setSelectedCommentId("");
        setUpdatedComment("");
        setIsPopoverOpen(false);
      } else {
        console.error("Error updating comment:", response.data);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleEditPopover = (commentId) => {
    setSelectedCommentId(commentId);
    setIsPopoverOpen(true);
  };

  return (
    <>
      <div className="flex flex-col flex-wrap mx-auto lg:max-w-5xl mt-10">
        <div className="flex border-b border-gray-700">
          <h2 className="my-2 text-sm tracking-widest text-gray-500 title-font">
            Recent Comments
          </h2>
        </div>
        <div>
          {comments.length > 0 &&
            comments.map((item) => (
              <div
                key={item.comment_id}
                className="flex content-center py-4 border-b border-gray-700"
              >
                <div className="flex w-full px-10 justify-between">
                  <div className="flex flex-col flex-wrap items-center">
                    <div className="flex mb-4">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={item.profile_picture}
                        alt="Avatar"
                      />
                      <p className="ms-3">{item.username}</p>
                    </div>
                    <div className="flex flex-col items-start justify-between w-full space-y-2 sm:flex-row">
                      <p className="text-xs text-gray-500">
                        {item.created_at}
                      </p>
                    </div>
                    <div className="col-span-2 text-left mt-5 mt-5">
                      <p className="text-md text-left">{item.content}</p>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    {item.user_id === user_id && (
                      <>
                        <Button
                          className="text-red-500 text-xs hover:text-red-700 ml-2 mb-2 font-semibold bg-transparent"
                          onClick={() => handleDeleteComment(item.comment_id)}
                        >
                          DELETE
                        </Button>
                        <Popover className="bg-gray-500">
                          <PopoverHandler
                            onClick={() => handleEditPopover(item.comment_id)}
                          >
                            <Button className="bg-transparent text-xs text-gray-500 ml-2">
                              Edit
                            </Button>
                          </PopoverHandler>
                          <PopoverContent className="border text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block pl-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100">
                            <form
                              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                              onSubmit={handleEditForm}
                            >
                              <div className="mb-4 flex flex-col gap-I apologize for the incomplete response in the previous message. Here's the continuation of the corrected code:

```jsx
    6">
                                <Input
                                  size="lg"
                                  className="border text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100"
                                  value={updatedComment}
                                  onChange={handleUpdateComment}
                                />
                              </div>
                              <Button
                                className="text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
                                fullWidth
                                type="submit"
                              >
                                Edit
                              </Button>
                            </form>
                          </PopoverContent>
                        </Popover>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          <div className="flex items-center mt-4">
            <textarea
              className="border text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button
              className="ms-5 px-5 py-2.5 text-xs lg:text-sm font-medium text-center text-gray-100 rounded-lg bg-cyan-900 focus:ring-4 focus:outline-none hover:bg-cyan-950 focus:ring-cyan-950"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddComments;