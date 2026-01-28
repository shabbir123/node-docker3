const Post = require("../models/postModel")

exports.getAllPosts = async (req, res, next) => {

  try {
    const posts = await Post.find();
    res.status(200).send({
      status: "success",
      results: posts.length,
      data: {
        posts
      }
    })
  } catch (error) {
    res.status(400).send({
      status: "failed"
    })
  }
};

exports.getOnePost = async (req, res, next) => {

  try {
    const posts = await Post.findById(req.params.id);
    res.status(200).send({
      status: "success",
      data: {
        posts
      }
    })
  } catch (error) {
    res.status(400).send({
      status: "failed"
    })
  }
};

exports.createPost = async (req, res, next) => {

  try {
    const posts = await Post.create(req.body)
    res.status(201).send({
      status: "success",
      data: {
        posts
      }
    })
  } catch (error) {
    res.status(400).send({
      status: "failed"
    })
  }
};

exports.updatePost = async (req, res, next) => {

  try {
    const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).send({
      status: "success",
      data: {
        posts
      }
    })
  } catch (error) {
    res.status(400).send({
      status: "failed",
    })
  }
};

exports.deletePost = async (req, res, next) => {

  try {
    const posts = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send({
      status: "success",

    })
  } catch (error) {
    res.status(400).send({
      status: "failed"
    })
  }
};


