const db = require("../model/db");

const getAllPosts = (req, res) => {
  db.query(
    "SELECT posts.* , users.profile_picture, users.username from posts JOIN users ON posts.user_id = users.user_id WHERE post_status = 'accepted'",
    (error, result) => {
      if (error) {
        console.error("Error retrieving comments:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(result.rows);
      }
    }
  );
};

const createPost = (req, res) => {
  const { user_id, title, content, created_at } = req.body;

  const query = `
    INSERT INTO posts (user_id, title, content, created_at)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  db.query(query, [user_id, title, content, created_at])
    .then((result) => {
      const newPost = result.rows[0];
      res.status(201).json(newPost);
    })
    .catch((error) => {
      console.error("Error creating new post:", error);
      res.status(500).json({ error: "Failed to create new post" });
    });
};

const getPostsbyID = (req, res) => {
  const { post_id } = req.params;
  const query =
    "SELECT p.*, u.profile_picture, u.username FROM posts p JOIN users u ON p.user_id = u.user_id WHERE p.post_id = $1";
  const values = [post_id];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error fetching post:", err);
      res.status(500).json({ error: "Internal server error" });
    } else if (results.rows.length === 0) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json(results.rows[0]);
    }
  });
};

// get all comments for the post
const getAllComments = (req, res) => {
  const { post_id } = req.params;
  db.query(
    "SELECT comments.* , users.profile_picture,users.username FROM comments JOIN users ON comments.user_id =users.user_id where comments.post_id= $1",
    [post_id],
    (error, result) => {
      if (error) {
        console.error("Error retrieving comments:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json(result.rows);
      }
    }
  );
};

// insert new comment
const postNewComment = (req, res) => {
  const { post_id } = req.params;
  const { user_id, content } = req.body;

  const query =
    "INSERT INTO comments (post_id, user_id,content) VALUES ($1,$2,$3) RETURNING *";
  db.query(query, [post_id, user_id, content])
    .then((result) => {
      const newComment = result.rows[0];
      res.status(201).json(newComment);
    })
    .catch((error) => {
      console.error("Error creating new comment:", error);
      res.status(500).json({ error: "Failed to create new comment" });
    });
};

// Route to delete a specific comment
const deleteCommentById = (req, res) => {
  const { commentId, user_id } = req.params;

  db.query(
    "DELETE FROM comments WHERE comment_id = $1 AND user_id=$2",
    [commentId, user_id],
    (error, result) => {
      if (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Internal server error" });
      } else if (result.rowCount === 0) {
        res.status(404).json({ error: "Comment not found" });
      } else {
        res.sendStatus(204);
      }
    }
  );
};

const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const updateQuery =
      "UPDATE comments SET content = $1 WHERE comment_id = $2";
    await db.query(updateQuery, [content, commentId]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.sendStatus(500);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostsbyID,
  getAllComments,
  postNewComment,
  deleteCommentById,
  editComment,
};
