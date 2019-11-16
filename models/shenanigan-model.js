const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shenaniganSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
      minlength: 2
    },
    date: {
      type: Date
      // required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    },
    image: {
      type: String
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    transportation: [{ type: Schema.Types.ObjectId, ref: "Transportation" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },

  {
    timestamps: true
  }
);

const Event = mongoose.model("Shenanigan", shenaniganSchema);
module.exports = Event;
