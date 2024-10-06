"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeamsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // 팀 이름은 고유해야 함
    trim: true,
  },
  image: {
    type: String,
    required: true, // 이미지 URL은 필수
  },
  region: {
    type: String,
    enum: ["Atlantic", "Central", "Southeast", "Northwest", "Pacific", "Southwest"], // 지역을 제한
    default: '' // 기본값으로 빈 문자열 설정
  },
  Id: {
    type: String,
    required: true, // ID는 필수
    unique: true, // 팀 ID는 고유해야 함
  }
});

// 모델을 내보냅니다.
module.exports = mongoose.model("Teams", TeamsSchema);
