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