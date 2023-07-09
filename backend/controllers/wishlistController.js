const db = require("../model/db");

const addToWishlist = (req, res) => {
  const { id } = req.body;
  const { user_id } = req.params;

  db.query(
    "INSERT INTO favorites (user_id, book_id) VALUES ($1, $2)",
    [user_id, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to add book to wishlist" });
      } else {
        res.status(200).json({ message: "Book added to wishlist" });
      }
    }
  );
};

const getAllFavoritesByUserId = (req, res) => {
  const { user_id } = req.params;
  db.query(
    "SELECT book_id FROM favorites WHERE user_id = $1",
    [user_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get favorites" });
      } else {
        // Extracting book_id values from the result
        const bookIds = result.rows.map(row => row.book_id);
        if (bookIds.length === 0) {
          res.status(404).json({ message: "No favorites found for the user" });
        } else {
          res.status(200).json(bookIds);
        }
      }
    }
  );
};




const removeFromWishlist = async (req, res) => {
  try {
    const { user_id, book_id } = req.params;

    // Check if the book exists in the user's wishlist
    const wishlistItem = await db.query(
      "SELECT * FROM favorites WHERE user_id = $1 AND book_id = $2",
      [user_id, book_id]
    );

    if (wishlistItem.rows.length === 0) {
      return res.status(404).json({ message: "Book not found in wishlist" });
    }

    // Remove the book from the wishlist
    await db.query(
      "DELETE FROM favorites WHERE favorite_id = $1",
      [wishlistItem.rows[0].favorite_id]
    );

    return res.status(200).json({ message: "Book removed from wishlist" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { addToWishlist, getAllFavoritesByUserId, removeFromWishlist };
