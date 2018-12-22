const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: "Usuario requerido"
    },
    name: {
      type: String,
      require: true
    },
    time: {
      type: Number,
      require: "Proporciona una duración"
    },  
    difficulty: {
      type: String,
      enum: ["Fácil", "Media", "Avanzada"],
      require: "Dificultad requerida"
    },
    description: {
      type: String,
      require: "Ingresa una descripción"
    },
    servings: {
      type: Number,
      require: "Ingresa las porciones"
    }, 
    _category: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
      required: 'Prorciona una categoria'
    },
    ingredients: {
      type: [String],
      required: "Los ingredientes deben de ser proporcionados"
    },
    preparation: {
      type: String,
      // required: "La forma de preparación debe de ser proporcionada "
    },
    images: {
      type: [String],
      require: "Proporciona algunas imágenes de referencia"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
