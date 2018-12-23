const express = require("express");
const router = express.Router();
const Comment = require('../models/Comment')
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.post("/new/:id", (req, res) => {
  let a = new Date().getFullYear();
  let m = new Date().getMonth() + 1;
  let d = new Date().getDate();
  let h = new Date().getHours();
  let min = new Date().getMinutes();
  let fullDate = a + "/" + m + "/" + d + "..." + h + ":" + min;
  Comment.create({
    _recipe: req.params.id,
    _user: req.body._user,
    comment: req.body.comment,
    rating: req.body.rating,
    date: fullDate
  })
    .then(() => {
      res.status(201).json({ msg: "Comentario publicado" });
    })
    .catch(err => {
      res.status(500).json({ err, msg: "No se pudo publicar el comentario" });
    });
});

router.get("/allComments/:id",  (req, res) => {
  Comment.find({_recipe: req.params.id })
    .sort({ created_at: -1 })
    .populate("_user")
    .then(Comments => res.status(201).json({ Comments }))
    .catch(err => {
      res.status(500).json({ err, msg: "Error al mostrar los comentarios" });
    });
});

module.exports = router;