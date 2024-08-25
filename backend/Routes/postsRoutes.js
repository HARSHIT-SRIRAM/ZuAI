const express = require("express");
const router = express.Router();
const postController = require("../Controllers/postControllers");

router.post("/createpost", postController.createPost);

router.get("/getpost", postController.getPosts);

router.get("/getpost/:id", postController.getPostsById);

module.exports = router;
