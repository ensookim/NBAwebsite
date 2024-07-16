const mongoose = require("mongoose");
const axios = require("axios");
const Player = require("../models/NbaPlayers.js");
const cheerio = require('cheerio');

// 데이터베이스 연결 설정
mongoose.connect('mongodb://127.0.0.1:27017/ut-nodejs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 데이터베이스 연결 확인
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('DB 연결완료...');
});

//크롤링하고 DB에 저장
const crawlAndSavePlayers = async () => {
  try {
    console.log('크롤링 시작 ');
    const url = 'https://www.nba.com/players';
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const players = [];

    $('tr').each((index, element) => {
      const nameElement = $(element).find('.RosterRow_playerName__G28lg');
      const firstName = nameElement.find('.RosterRow_playerFirstName__NYm50').text().trim();
      const lastName = nameElement.find('p:not(.RosterRow_playerFirstName__NYm50)').text().trim();
      const name = `${firstName} ${lastName}`;

      const team = $(element).find('.RosterRow_team__AunTP').text().trim();
      const position = $(element).find('td.text').eq(2).text().trim();
      const weight = $(element).find('td.text').eq(3).text().trim();
      const heightElement = $(element).find('td').eq(4);
      const height = heightElement.text().trim();

      


      const image = $(element).find('.RosterRow_playerHeadshot__tvZOn img').attr('src');

      const player = new Player({
        name,
        team,
        position,
        weight,
        height,
        image
      });

      players.push(player);
    });

    await Player.insertMany(players);
    console.log('성공적으로 크롤링후 DB에 저장하였습니다.');

    
    db.close(); // 데이터베이스 연결 종료
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

crawlAndSavePlayers();
