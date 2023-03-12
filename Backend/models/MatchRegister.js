const mongoose = require("mongoose");

const matchRegisterSchema = mongoose.Schema({
  place: { type: String, required: true },
  date: { type: Date, required: true },
  team1: { type: String, required: true },
  team2: { type: String, required: true },
});

const MatchRegister = mongoose.model("MatchRegister", matchRegisterSchema);

module.exports = MatchRegister;
