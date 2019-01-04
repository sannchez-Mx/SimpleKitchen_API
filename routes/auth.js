const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  const { username, email } = req.body;

  if (
    req.body.username === "" &&
    req.body.name === "" &&
    req.body.email === "" &&
    req.body.password === "" &&
    req.body["confirmPassword"] === ""
  ) {
    return res.status(500).json({ msg: "NO completaste ningún campo" });
  } else if (req.body.username === "") {
    res.status(500).json({ msg: "Ingresa un nombre de usuario" });
    return;
  } else if (req.body.name === "") {
    res.status(500).json({ msg: "Ingresa tu nombre" });
    return;
  } else if (req.body.email === "") {
    res.status(500).json({ msg: "Ingresa tu email" });
    return;
  } else if (req.body.password === "") {
    res.status(500).json({ msg: "Ingresa una contraseña" });
    return;
  } else if (req.body.password !== req.body.confirmPassword) {
    return res.status(500).json({ msg: "Las cotraseñas no coinciden" });
  }
  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(500).json({ msg: "El usuario ya esta registrado" });
      return;
    }
    User.findOne({ email }, "email", (err, user) => {
      if (user !== null) {
        res.status(500).json({ msg: "El correo ya esta registrado" });
        return;
      }
      const salt = bcrypt.genSaltSync(256);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
        .then(() => {
          res.status(201).json({ msg: "Usuario registrado con éxito" });
        })
        .catch(err => {
          res.status(500).json({ err, msg: "No se pudo crear usuario" });
        });
    });
  });
});

router.post("/login", async (req, res) => {
  if (
    req.body.username === "" &&
    req.body.password === ""
  ) {
    return res.status(500).json({ msg: "NO completaste ningún campo" });
  }
  else if (req.body.username === "") {
    res.status(500).json({ msg: "Ingresa tu nombre de usuario" });
    return;
  }
  else if (req.body.password === "") {
    res.status(500).json({ msg: "Ingresa tu contraseña" });
    return;
  }  
  const user = await User.findOne({ username: req.body.username });

  if (!user) return res.status(404).json({ msg: "Usuario incorrecto" });

  let validPassword = bcrypt.compareSync(req.body.password, user.password);

  if (!validPassword)
    return res.status(500).json({ msg: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 6200
  });
  console.log(user);
  res.status(200).json({user, token, msg: 'Iniciaste sesión ¡hurra!'});
});

router.get('/loggedin', (req, res) => {

  const token = req.headers['x-access-token'];
  if(!token) return res.status(403).json({msg:'No hay token'})

  jwt.verify(token, process.env.SECRET, async (err, decoded)=>{
    if(err) return res.status(403).json({err, msg:'Sesión expirada'})
    //req.user = await User.findById(decoded.id)
    //next();
    res.status(200).json({msg: 'Token valido'})
  })
})

module.exports = router;
