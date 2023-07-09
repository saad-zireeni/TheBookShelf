const db = require("../model/db");

// contact us page
const postContactMessages = (req, res) => {
  const { user_id, name, phone_number, message, email } = req.body;

  const sql =
    "INSERT INTO contact (username,phone_number,message,email,user_id) VALUES ($1, $2, $3, $4,$5)";
  const values = [name, phone_number, message, email, user_id];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error inserting message into the database:", error);
      return res
        .status(500)
        .json({ error: "Failed to insert message into the database" });
    }

    res.json({ message: "Message received successfully" });
  });
};

// get user contact message from the admin page
const getUserContactMessage = async (req, res) => {
  try {
    const messagesQuery = `
      SELECT c.contact_id AS id, c.message, username, c.email
      FROM contact c `;
    const messagesResult = await db.query(messagesQuery);

    const messages = messagesResult.rows;
    res.json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  postContactMessages,
  getUserContactMessage,
};
