const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    _recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      require: true
    },
    comment: {
      type: String,
      //require: true
    },
    rating: {
      type: Number,
      //required: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("comment", commentSchema);
