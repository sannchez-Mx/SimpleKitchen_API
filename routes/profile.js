const express = require("express");
const router = express.Router();
const User = require("../models/User");
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
  if(req.file) user.profilePicture = req.file.url;

  User.findByIdAndUpdate(req.params.id, {$set: user}, {new:true})
      .then(user => {
        if(!user) return res.status(500).json({msg: 'Error al actualizar'});
        delete user._doc.password;
          res.status(200).json({user, msg: "Foto de perfil actualizada"});
      })
      .catch(err => {
        res.status(500).json({ err, msg: "Error al actualizar foto de perfil" });
      });
});

module.exports = router;