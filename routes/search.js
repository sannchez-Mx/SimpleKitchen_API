const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

router.post("/", (req, res) => {
  console.log(req.body);
  Recipe.find({ name: { $regex: "^" + req.body.search, $options: "$i" } })
    .sort({ created_at: -1 })
    .populate("_user")
    .then(items =>
      items.length === 0
        ? res.status(400).json({ msg: "Ningún resultado para tu búsqueda" })
        : res.status(201).json({ items, msg: items.length + " " + "resultados para tu búsqueda" })
    )
    .catch(err => {
      res.status(500).json({ err, msg: "Error en la búsqueda" });
    });
});

module.exports = router;
