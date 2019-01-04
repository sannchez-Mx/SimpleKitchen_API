const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Comentario = require("../models/Comment");
const upload = require("../helpers/multer");

router.post("/edit/:id", (req, res) => {
  let user = {};
  Object.keys(req.body).forEach(key => {
    user[key] = req.body[key];
  });
  User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true })
    .then(() => {
      res.status(200).json({ user, msg: "Usuario actualizado" });
    })
    .catch(err => {
      res.status(500).json({ err, msg: "Ocurrió un error al actualizar" });
    });
});

router.patch("/profilePicture/:id", upload.single("profilePicture"), (req, res) => {
    let user = {};

    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key];
    });
    if (req.file) user.profilePicture = req.file.url;

    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true })
      .then(user => {
        if (!user) return res.status(500).json({ msg: "Error al actualizar" });
        delete user._doc.password;
        res.status(200).json({ user, msg: "Foto de perfil actualizada" });
      })
      .catch(err => {
        res
          .status(500)
          .json({ err, msg: "Error al actualizar foto de perfil" });
      });
  }
);

router.post("/delete/:id", (req, res) => {
  let p1 = new Promise((resolve, reject) => { 
    setTimeout(resolve(Comentario.findOneAndDelete({_user: req.params.id})), 1000, "one"); 
  }); 
  let p2 = new Promise((resolve, reject) => { 
    setTimeout(resolve(Recipe.findOneAndDelete({_user: req.params.id})), 2000, "two"); 
  });
  let p3 = new Promise((resolve, reject) => {
    setTimeout(resolve(User.findByIdAndDelete(req.params.id)), 3000, "three");
  });
  Promise.all([p1, p2, p3]).then(values => { 
    res.status(201).json({values, msg: "Usuario borrado con éxito"})
  }).catch(reason => { 
    res.status(500).json({reason, msg: "Error al borrar usuario"})
  });
});

module.exports = router;
