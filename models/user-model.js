const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    lat: Number,
    lng: Number,
    userFriends: { type: [{ type: Schema.Types.ObjectId, ref: "User" }] },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
