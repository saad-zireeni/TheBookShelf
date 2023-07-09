const db = require("../model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function tokenGenerator({ user_id, role, username, email }) {
  const payload = { user_id, role, username, email };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
}

const handleCreateNewAdmin = async (req, res) => {
  const { username, email, dateofbirth, password } = req.body;

  let sql = "SELECT * FROM public.users where email = $1";
  const oldUser = await db.query(sql, [email]);

  if (oldUser.rows.length != 0) {
    res.status(409).send("User Already Exist.");
  } else {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    db.query(
      "INSERT INTO public.users (username,email,dateofbirth,password,role) VALUES ($1,$2,$3,$4,'admin') RETURNING *",
      [username, email, dateofbirth, hashedPassword],
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }
        const { user_id, role, username, email } = results.rows[0];
        const token = tokenGenerator({
          user_id,
          role,
          name: username,
          email: email,
        });
        console.log("token:", token);
        res.status(201).json({ token });
      }
    );
  }
};

const checkAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const query =
      "SELECT * FROM public.users WHERE role = 'admin' ORDER BY user_id ASC";
    const results = await db.query(query);

    for (const user of results.rows) {
      const match = await bcrypt.compare(password, user.password);
      if (user.email === email && match) {
        const token = tokenGenerator(user);
        console.log("User LoggedIn successFully");
        return res.status(200).json({ token });
      }
    }
    res.sendStatus(401);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Soft delete the user from the database
const deleteUserFromWebSite = (req, res) => {
  const { user_id } = req.params;
  const { deleted } = req.body;

  // Update the 'deleted' column for the specified user_id
  const query = "UPDATE users SET deleted = $1 WHERE user_id = $2";

  db.query(query, [deleted, user_id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(200).json({ message: "User soft deleted successfully" });
    }
  });
};

// To get all the users
const getAllUsersData = (req, res) => {
  db.query("SELECT * FROM users WHERE deleted='false' ", (error, result) => {
    if (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

// Get all posts with status 'pending'
const getAllPostsWherePending = async (req, res) => {
  try {
    const query = `
      SELECT 
        posts.*, 
        users.username, 
        users.profile_picture 
      FROM 
        posts 
      INNER JOIN 
        users 
      ON 
        posts.user_id = users.user_id 
      WHERE 
        posts.post_status = $1
    `;
    const values = ["pending"];
    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error("Error retrieving pending posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all posts with status 'pending'
const getAllPostsWhereAccept = async (req, res) => {
  try {
    const query = `
      SELECT 
        posts.*, 
        users.username, 
        users.profile_picture 
      FROM 
        posts 
      INNER JOIN 
        users 
      ON 
        posts.user_id = users.user_id 
      WHERE 
        posts.post_status = $1
    `;
    const values = ["accepted"];
    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error("Error retrieving pending posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a post
const deletePostAdmin = async (req, res) => {
  const postId = req.params.postId;

  try {
    const query = "DELETE FROM posts WHERE post_id = $1";
    const values = [postId];
    await db.query(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Accept a post
const updatePostStatusAccept = async (req, res) => {
  const { post_id } = req.params;
  try {
    const query = "UPDATE posts SET post_status = $1 WHERE post_id = $2";
    const values = ["accepted", post_id];
    await db.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error accepting the post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Reject a post
const updatePostStatusReject = async (req, res) => {
  const { post_id } = req.params;
  const { reason } = req.body;
  try {
    const query =
      "UPDATE posts SET post_status = $1, rejection_reason = $2 WHERE post_id = $3";
    const values = ["rejected", reason, post_id];
    await db.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error rejecting the post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Route to get all comments
const getAllComments = (req, res) => {
  db.query(
    "SELECT comments.*, users.username, users.profile_picture FROM comments JOIN users ON comments.user_id = users.user_id",
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

// Route to delete a specific comment
const deleteCommentById = (req, res) => {
  const { commentId } = req.params;

  db.query(
    "DELETE FROM comments WHERE comment_id = $1",
    [commentId],
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

module.exports = {
  handleCreateNewAdmin,
  checkAdmin,
  deleteUserFromWebSite,
  getAllUsersData,
  getAllPostsWherePending,
  updatePostStatusAccept,
  updatePostStatusReject,
  getAllComments,
  deleteCommentById,
  getAllPostsWhereAccept,
  deletePostAdmin,
};
