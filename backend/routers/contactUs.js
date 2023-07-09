const express = require("express");
const router = express.Router();
const contactUsController = require("../controllers/contactUsController");

router.post("/contacts", contactUsController.postContactMessages);

router.get("/messagesData", contactUsController.getUserContactMessage);

module.exports = router;
