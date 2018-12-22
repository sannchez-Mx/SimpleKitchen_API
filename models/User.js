const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: "Un usuario debe ser proporcionado",
      unique: "El usuario ya existe"
    },
    name: {
      type: String,
      required: "Un nombre debe ser proporcionado"
    },
    email: {
      type: String,
      require: "Un email debe ser proporcionado",
      unique: "El email debe de ser unico"
    },
    password: {
      type: String,
      required: "La contraseña debe ser definida"
    },
    profilePicture: {
      type: String,
      default: 'http://www.socialbiblio.com/sites/default/files/expertos/persona2.png'
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("User", UserSchema);
