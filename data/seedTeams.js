"use strict";

const mongoose = require("mongoose");
const Teams = require("../models/Teams");


// 데이터베이스 연결 설정
mongoose.connect("mongodb://127.0.0.1:27017/ut-nodejs", {
  useNewUrlParser: true,
});

mongoose.connection;

var teams = [
  {
    name: "Atlanta Hawks",
    city: "Atlanta",
    image: "img/Atlanta.png",
    region: "East",
  },
  {
    name: "Boston Celtics",
    city: "Boston",
    image: "img/bosston.png",
    region: "East",
  },
  {
    name: "Brooklyn Nets",
    city: "Brooklyn",
    image: "img/brooklyn.png",
    region: "East",
  },
  {
    name: "Charlotte Hornets",
    city: "Charlotte",
    image: "img/Charlotte.png",
    region: "East",
  },
  {
    name: "Chicago Bulls",
    city: "Chicago",
    image: "img/chicago.png",
    region: "East",
  },
  {
    name: "Cleveland Cavaliers",
    city: "Cleveland",
    image: "img/cleveland.png",
    region: "East",
  },
  {
    name: "Dallas Mavericks",
    city: "Dallas",
    image: "img/dal.png",
    region: "West",
  },
  {
    name: "Denver Nuggets",
    city: "Denver",
    image: "img/denver.png",
    region: "West",
  },
  {
    name: "Detroit Pistons",
    city: "Detroit",
    image: "img/detroit.png",
    region: "East",
  },
  {
    name: "Golden State Warriors",
    city: "Golden State",
    image: "img/golden.png",
    region: "West",
  },
  {
    name: "Houston Rockets",
    city: "Houston",
    image: "img/houston.png",
    region: "West",
  },
  {
    name: "Indiana Pacers",
    city: "Indiana",
    image: "img/pacers.png",
    region: "East",
  },
  {
    name: "Los Angeles Clippers",
    city: "Los Angeles",
    image: "img/clippers.png",
    region: "West",
  },
  {
    name: "Los Angeles Lakers",
    city: "Los Angeles",
    image: "img/lakers.png",
    region: "West",
  },
  {
    name: "Memphis Grizzlies",
    city: "Memphis",
    image: "img/memphis.png",
    region: "West",
  },
  {
    name: "Miami Heat",
    city: "Miami",
    image: "img/miami.png",
    region: "East",
  },
  {
    name: "Milwaukee Bucks",
    city: "Milwaukee",
    image: "img/milwaukee.png",
    region: "East",
  },
  {
    name: "Minnesota Timberwolves",
    city: "Minnesota",
    image: "img/minnesota.png",
    region: "West",
  },
  {
    name: "New Orleans Pelicans",
    city: "New Orleans",
    image: "img/New Orleans.png",
    region: "West",
  },
  {
    name: "New York Knicks",
    city: "New York",
    image: "img/newyork.png",
    region: "East",
  },
  {
    name: "Oklahoma City Thunder",
    city: "Oklahoma City",
    image: "img/oklahoma.png",
    region: "West",
  },
  {
    name: "Orlando Magic",
    city: "Orlando",
    image: "img/orlando.png",
    region: "East",
  },
  {
    name: "Philadelphia 76ers",
    city: "Philadelphia",
    image: "img/Philadelphia.png",
    region: "East",
  },
  {
    name: "Phoenix Suns",
    city: "Phoenix",
    image: "img/phoenix.png",
    region: "West",
  },
  {
    name: "Portland Trail Blazers",
    city: "Portland",
    image: "img/portland.png",
    region: "West",
  },
  {
    name: "Sacramento Kings",
    city: "Sacramento",
    image: "img/kings.png",
    region: "West",
  },
  {
    name: "San Antonio Spurs",
    city: "San Antonio",
    image: "img/SanAntonio.png",
    region: "West",
  },
  {
    name: "Toronto Raptors",
    city: "Toronto",
    image: "img/raptors.png",
    region: "East",
  },
  {
    name: "Utah Jazz",
    city: "Utah",
    image: "img/jazz.png",
    region: "West",
  },
  {
    name: "Washington Wizards",
    city: "Washington",
    image: " img/washington.png",
    region: "East",
  },
  
];

var commands = [];

Teams.deleteMany({})
  .exec()
  .then((result) => {
    console.log(`Deleted ${result.deletedCount} team records!`);
  });

setTimeout(() => {
  // 프라미스 생성을 위한 팀 객체 루프
  teams.forEach((team) => {
    commands.push(
      Teams.create({
        name: team.name,
        city: team.city,
        image: team.image,
        region: team.region,
      }).then((team) => {
        console.log(`Created team: ${team.name}`);
      })
    );
  });

  console.log(`${commands.length} commands created!`);

  Promise.all(commands)
    .then((r) => {
      console.log(JSON.stringify(r));
      mongoose.connection.close();
      console.log("Connection closed!");
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}, 500);
