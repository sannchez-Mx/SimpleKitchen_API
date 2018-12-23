const express = require("express");
const router = express.Router();
const Comment = require('../models/Comment')
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.post("/new/:id", (req, res) => {
  Comment.create({
    _recipe: req.params.id,
    _user: req.body._user,
    comment: req.body.comment,
    rating: req.body.rating
  })
    .then(() => {
      res.status(201).json({ msg: "Comentario publicado" });
    })
    .catch(err => {
      res.status(500).json({ err, msg: "No se pudo publicar el comentario" });
    });
});

router.get("/allComments",  (req, res) => {
  Comment.find()
    .sort({ created_at: 1 })
    .populate("_user")
    .then(Comments => res.status(201).json({ Comments }))
    .catch(err => {
      res.status(500).json({ err, msg: "Error al mostrar los comentarios" });
    });
});

module.exports = router;