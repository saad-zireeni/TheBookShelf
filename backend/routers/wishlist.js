const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");




// Add a book to the wishlist
router.post("/wishlist/:user_id", wishlistController.addToWishlist);

// Get all favorites by user ID
router.get("/favorites/:user_id", wishlistController.getAllFavoritesByUserId);


router.delete("/favorites/:user_id/:book_id", wishlistController.removeFromWishlist);

module.exports = router;