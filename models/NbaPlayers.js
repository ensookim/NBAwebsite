const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: false
  },
  position: {
    type: String,
    required: false
  },
  image: {
    type: String
  },
  height: {
      
    type: String,
    required: false
  },
  weight: {
    type: String,
    required: false
  },
  playerId: { 
    type: String, required: true 
  } 
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
