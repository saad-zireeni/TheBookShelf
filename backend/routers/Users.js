const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/UsersController");
const verifyJWT = require("../middleware/verifyToken");

router.post("/AddNewUser", signUpController.handleCreateNewUser);
router.get("/AllUsers", signUpController.handleGetAllUsers);
router.post("/LoginUser", signUpController.checkUser);
router.get("/getUserById/:id", signUpController.getUserById);
router.delete("/deleteUser/:id", signUpController.deleteUser);
router.put("/UpdateUser/:id", signUpController.UpdateUser);
router.delete('/deletePost/:post_id/:user_id',signUpController.deleteThePostByUser);
router.get('/userPostsInProfile/:user_id',signUpController.getPostsUserProfile);

module.exports = router;
