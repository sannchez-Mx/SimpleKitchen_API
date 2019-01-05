const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");

router.post("/new/:id", (req, res) => {
  console.log("=====>", req.body);
  
  Favorite.create({
    _recipe: req.params.id,
    _userF: req.body._user
  })
    .then(() => {
      res.status(201).json({ msg: "Receta agregada a favoritos" });
    })
    .catch(err => {
      res.status(500).json({ err, msg: "No se pudo agregar a favoritos" });
    });
});

router.get("/allFavorites/:id", (req, res) => {
  Favorite.find({ _userF: req.params.id })
    .populate("_recipe")
    .then(items => res.status(201).json({ items }))
    .catch(err => {
      res.status(500).json({ err, msg: "No se pudo mostrar los favoritos" });
    });
});

router.post("/delete/:id", (req, res) => {
  Favorite.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(201).json({ msg: "Receta borrada con éxito" });
    })
    .catch(err => {
      res.status(500).json({ err, msg: "Error al borrar la receta" });
    });
});

module.exports = router;
