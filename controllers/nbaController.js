// controllers/nbaController.js
const axios = require('axios');
const options = {
  method: 'GET',
  url: 'https://api-nba-v1.p.rapidapi.com/players',
  params: {
    team: '1',
    season: '2021'
  },
  headers: {
    'x-rapidapi-key': 'c240a6a1femsha559e761387d172p1eb0bdjsn090be3b3a299',
    'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
  }
};
exports.getGameStatistics = async (req, res) => {
  try {
    const response = await axios.request(apiOptions);
    const statistics = response.data;
    res.render('nbaplayers/statistics', { statistics: statistics, title: 'Game Statistics' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.showPlayers = async (req, res) => {
  try {
    const response = await axios.get('https://api-nba-v1.p.rapidapi.com/players', {
      headers: {
        'X-RapidAPI-Key': 'YOUR_API_KEY',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
    });
    const players = response.data.response;
    res.render('players', { players });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const Player = require("../models/NbaPlayers");

exports.showPlayers = (req, res) => {
  Player.find({})
    .then((players) => {
      res.render('nbaplayers/index', { players: players, title: 'NBA Players' });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      res.status(500).send('Internal Server Error');
    });
};


exports.editPlayer = (req, res) => {
  const playerId = req.params.id;
  // 클라이언트로부터 전송된 수정된 플레이어 데이터
  const updatedPlayerData = req.body;

  Player.findByIdAndUpdate(playerId, updatedPlayerData)
    .then(() => {
      res.redirect('/players');
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      res.status(500).send('Internal Server Error');
    });
};

exports.deletePlayer = (req, res) => {
  const playerId = req.params.id;

  Player.findByIdAndRemove(playerId)
    .then(() => {
      res.redirect('/players');
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      res.status(500).send('Internal Server Error');
    });
};