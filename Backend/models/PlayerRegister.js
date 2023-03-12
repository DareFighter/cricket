const mongoose = require("mongoose");

const PlayerRegisterSchema = mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
  playerRole: {
    type: String,
    required: true,
  },
  playerCountry: {
    type: String,
    required: true,
  },
});

const PlayerRegisterDeails = mongoose.model(
  "PlayerRegister",
  PlayerRegisterSchema
);

module.exports = PlayerRegisterDeails;
