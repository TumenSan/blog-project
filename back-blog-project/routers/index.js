const Router = require("express").Router;
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const router = new Router();
const express = require('express');
const jsonParser = express.json();
//const { body } = require("express-validator");
//const authMiddleware = require('../middlewares/authMiddleware');


router.post('/blog/signup', jsonParser, userController.Signup);
router.post('/blog/addpost', jsonParser, postController.AddPost);
router.post('/blog/getposts', jsonParser, postController.GetPosts);
router.post('/blog/generateToken', jsonParser, userController.generateToken);
router.post('/blog/verifytoken', jsonParser, userController.verifyToken);
router.get('/blog/hello', userController.Hello);
router.get('/blog/goodbye', userController.Goodbye);
router.post('/blog/users', userController.GetAllUsers);

module.exports = router;