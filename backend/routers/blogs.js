const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// get all posts in the blog page
router.get("/getAllPosts", blogController.getAllPosts);

// get post details by id
router.get("/getPostById/:post_id", blogController.getPostsbyID);

// create post in the blog page
router.post("/createPost", blogController.createPost);

router.get("/getPostComments/:post_id/comments", blogController.getAllComments);

router.post("/postComments/:post_id/comments", blogController.postNewComment);

router.delete(
  "/DeleteComments/:commentId/:user_id",
  blogController.deleteCommentById
);

router.patch("/UpdateComments/:commentId", blogController.editComment);
module.exports = router;
