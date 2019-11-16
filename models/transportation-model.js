const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transportationSchema = new Schema({
  vehicleType: {
    type: String
  },
  model: {
    type: String
  },
  year: {
    type: String
  },
  images: {
    type: [String]
  },
  seats: {
    type: Number
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Transportation = mongoose.model("Transportation", transportationSchema);

module.exports = Transportation;
