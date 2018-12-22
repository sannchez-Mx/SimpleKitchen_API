const express = require("express");
const router = express.Router();
const Comment = require('../models/Comment')
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.post("/new/:id", (req, res) => {
  console.log(req.body)
  Comment.create({
    _recipe: req.params.id,
    _user: req.body.user._id,
    comment: req.body.comment,
    rating: req.body.rating
  })
    .then((res) => {
      res.status(201).json({ msg: "Comentario publicado" });
    })
    .catch(err => {
      res.status(500).json({ err, msg: "No se pudo publicar el comentario" });
    });
});


module.exports = router;