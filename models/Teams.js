"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeamsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  city: {
    type: String,
  },
  image: {
    type: String,
  },
  region: {
    type: String,
    enum: ["West", "East"],
  },
});

module.exports = mongoose.model("Teams", TeamsSchema);
