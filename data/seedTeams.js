"use strict";

const mongoose = require("mongoose");
const axios = require("axios");
const Teams = require("../models/Teams"); // 팀 모델
const cheerio = require("cheerio");

// 데이터베이스 연결 설정
mongoose.connect("mongodb://127.0.0.1:27017/ut-nodejs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 데이터베이스 연결 확인
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("DB 연결완료...");
});

// 크롤링하고 DB에 저장
const crawlAndSaveTeams = async () => {
  try {
    console.log("크롤링 시작...");
    const url = "https://www.nba.com/teams";
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const teams = [];

    // 각 팀의 정보 추출
    $("div.TeamFigure_tfMain").each((index, element) => {
      // 팀 로고 이미지 URL 추출
      const teamImage = $(element).find("img.TeamLogo_logo__PclAJ").attr("src"); 

      // 팀 이름 추출
      const teamNameElement = $(element).find("a.TeamFigure_tfMainLink__OPLFu");
      const teamName = teamNameElement.text().trim(); 

      // 팀 ID 추출
      const teamIdMatch = teamImage.match(/nba\/(\d+)\//); // 이미지 URL에서 팀 ID 추출
      const teamId = teamIdMatch ? teamIdMatch[1] : null; // ID가 없으면 null

      // 유효한 팀 정보인지 확인
      if (teamId && teamName && teamImage) {
        const team = {
          name: teamName,
          image: teamImage,
          Id: teamId,
          region: '' // 지역 정보는 추가적으로 크롤링할 수 있습니다.
        };

        teams.push(team);
      } else {
        console.log(`팀 정보가 유효하지 않습니다: ${teamName}, ID: ${teamId}`);
      }
    });

    console.log("크롤링한 팀 데이터:", teams); // 크롤링한 팀 데이터를 출력

    // DB에 팀 정보 저장
    if (teams.length > 0) {
      await Teams.insertMany(teams);
      console.log("성공적으로 크롤링 후 DB에 저장하였습니다.");
    } else {
      console.log("저장할 팀 데이터가 없습니다.");
    }

    db.close(); // 데이터베이스 연결 종료
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

crawlAndSaveTeams();
