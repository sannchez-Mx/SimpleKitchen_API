const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const upload = require("../helpers/multer");

router.get("/recipes/:id", (req, res) => {
  Recipe.find({ _user: req.params.id })
    .populate("Category")
    .then(items => res.status(201).json({ items }))
    .catch(err => {
      res.status(500).json({ err, msg: "No se pudo crear la receta" });
    });
});

router.post("/new/:id", upload.array("images"), (req, res) => {
  console.log(req.files);

  let recipe = {};

  if (
    req.body.name === "" &&
    req.body.time === "" &&
    req.body.difficulty === "" &&
    req.body.description === "" &&
    req.body.servings === "" &&
    req.body.category === "" &&
    req.body.ingredients === "" &&
    req.body.preparation === ""
  ) {
    return res.status(500).json({ msg: "NO completaste ningún campo" });
  } else if (req.body.name === "") {
    res.status(500).json({ msg: "Ingresa el nombre de la receta" });
    return;
  } else if (req.body.time === "") {
    res.status(500).json({ msg: "Ingresa el tiempo de preparación" });
    return;
  } else if (req.body.difficulty === "") {
    res.status(500).json({ msg: "Ingresa la dificultad del platillo" });
    return;
  } else if (req.body.description === "") {
    res.status(500).json({ msg: "Ingresa una descripción" });
    return;
  } else if (req.body.servings === "") {
    res.status(500).json({ msg: "Ingresa las porciones por persona" });
    return;
  } else if (req.body.category === "") {
    res.status(500).json({ msg: "Ingresa un tipo de cocina" });
    return;
  } else if (req.body.ingredients === "") {
    res.status(500).json({ msg: "Ingresa los ingredientes" });
    return;
  } else if (req.body.preparation === "") {
    res.status(500).json({ msg: "Ingresa el modo de preparación" });
    return;
  }

  if (req.files.length > 0)
    recipe.images = req.files.map(image => {
      return image.url;
    });

  Recipe.create({
    _user: req.params.id,
    name: req.body.name,
    time: req.body.time,
    difficulty: req.body.difficulty,
    description: req.body.description,
    servings: req.body.servings,
    category: req.body.category,
    ingredients: req.body.ingredients,
    preparation: req.body.preparation,
    images: recipe.images
  })
    .then(() => {
      res.status(201).json({ msg: "Receta creada con éxito" });
    })
    .catch(err => {
      res.status(500).json({ err, msg: "No se pudo crear la receta" });
    });
});

router.post("/editRecipe/:id", upload.array("images"), (req, res) => {
  console.log(req.files);
  let recipe = {};
  Object.keys(req.body).forEach(key => {
    recipe[key] = req.body[key];
  });
  if (req.files.length > 0) {
    recipe.images = req.files.map(image => {
      return image.url;
    });
  }
  Recipe.findByIdAndUpdate(req.params.id, { $set: recipe }, { new: true })
    .then(() => {
      res.status(200).json({ recipe, msg: "Receta actualizada" });
    })
    .catch(err => {
      res.status(500).json({ err, msg: "Ocurrió un error al actualizar" });
    });
});

router.get("/recipeDetail/:id", (req, res) => {
  Recipe.find({ _id: req.params.id })
    .populate("_user")
    .then(recipe => res.status(201).json({ recipe }))
    .catch(err => {
      res.status(500).json({ err, msg: "Error al mostrar receta" });
    });
});

router.get("/allRecipes", (req, res) => {
  Recipe.find()
    .sort({ name: 1 })
    .populate("_user")
    .then(items => res.status(201).json({ items }))
    .catch(err => {
      res.status(500).json({ err, msg: "Error al mostrar las recetas" });
    });
});

module.exports = router;
