// app.js
"use strict";


// modules
const express = require("express"), // express를 요청
  layouts = require("express-ejs-layouts"), // express-ejs-layout의 요청
  app = express(), // express 애플리케이션의 인스턴스화
  methodOverride = require("method-override");
const axios = require("axios");
const cheerio = require("cheerio");

// controllers 폴더의 파일을 요청
const pagesController = require("./controllers/pagesController"),
  usersController = require("./controllers/usersController"),
  TeamsController = require("./controllers/teamsController"),
  errorController = require("./controllers/errorController"),
  nbaController= require("./controllers/nbaController");

const expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  expressValidator = require("express-validator"),
  passportLocalMongoose = require('passport-local-mongoose');


//database

// 애플리케이션에 Mongoose 설정
const mongoose = require("mongoose"), // mongoose를 요청
  dbName = "ut-nodejs";

// 데이터베이스 연결 설정
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, { 
  useNewUrlParser: true,
});

// 연결되면 메시지를 보냄
const db = mongoose.connection;
db.once("open", () => {
  console.log(`Connected to ${dbName} MongoDB using Mongoose!`);
});


app.use(methodOverride("_method", {methods: ["P0ST", "GET"]}));
app.set("port", process.env.PORT || 3000);



// ejs 레이아웃 렌더링
app.set("view engine", "ejs"); // ejs를 사용하기 위한 애플리케이션 세팅
app.use(layouts); // layout 모듈 사용을 위한 애플리케이션 세팅
app.use(express.static("public"));

app.use(expressValidator());

// body-parser의 추가
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//router

const router = express.Router(); // Express 라우터를 인스턴스화
app.use("/", router); // 라우터를 애플리케이션에 추가


router.use(
  expressSession({
    // express-session 미들웨어를 사용
    secret: "secret_passcode", // 비밀 키를 전달
    cookie: {
      maxAge: 4000000, // 쿠키의 유효 기간을 설정
    },
    resave: false, // 세션을 매번 재저장하지 않도록 설정
    saveUninitialized: false, // 초기화되지 않은 세션을 저장하지 않도록 설정
  })
);
router.use(connectFlash()); // connect-flash 미들웨어를 사용
const passport = require('passport');
router.use(passport.initialize());
router.use(passport.session());


// passport가 Express.js 내 세션을 사용하도록 설정
const User= require(`./models/User`);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

router.use((req, res, next) => {
  // 응답 객체상에서 플래시 메시지의 로컬 flashMessages로의 할당
  res.locals.flashMessages = req.flash(); // flash 메시지를 뷰에서 사용할 수 있도록 설정
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  // 로그인 여부를 확인하는 불리언 값을 로컬 변수에 추가
  // 현재 사용자를 로컬 변수에 추가
  next();
});


/**
 * Pages
 */
router.get("/", pagesController.showHome); // 홈 페이지 위한 라우트 추가
router.get("/about", pagesController.showAbout); // 코스 페이지 위한 라우트 추가
// router.get('/players/statistics', nbaController.getGameStatistics);


//여기서부터 로그인
router.get("/users/login", usersController.showlogin); // 로그인 폼을 보기 위한 요청 처리
router.post(
  "/users/login",
  usersController.authenticate,
  usersController.redirectView
); // 로그인 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get("/users/logout",
  usersController.logout,
  usersController.redirectView
);



router.get("/users", usersController.index, usersController.indexView); // index 라우트 생성
router.get("/users/new", usersController.new); // 생성 폼을 보기 위한 요청 처리
router.post( 
  "/users/create",
  usersController.validate, // Listing 23.6 (p. 344) - 사용자 생성 라우트에 유효성 체크 미들웨어 추가
  usersController.create,
  usersController.redirectView); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit); // viewing을 처리하기 위한 라우트 추가
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);

/**
 * TEAMS
 */
router.get("/teams",TeamsController.showTeams); 
router.get("/nbaplayers",nbaController.showPlayers);

app.delete('/teams/:id', (req, res) => {
  const teamId = req.params.id;
  Teams.deleteOne(teamId)
    .then(() => {
      res.status(500).send('Internal Server Error');
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});
router.get("/teams/:id/edit", TeamsController.edit);
router.post(
  "/teams/:id/update",
  TeamsController.update,
  TeamsController.redirectView
); 
router.get(
  "/teams/:id/delete",
  TeamsController.deleteTeam
); 

/**
 * Users
 */
router.get("/users", usersController.index, usersController.indexView); // index 라우트 생성
router.get("/users/new", usersController.new); // 생성 폼을 보기 위한 요청 처리
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit); // viewing을 처리하기 위한 라우트 추가
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);


app.use(errorController.resNotFound); // 미들웨어 함수로 에러 처리 추가
app.use(errorController.resInternalError);

app.listen(app.get("port"), () => {
  // 3000번 포트로 리스닝 설정
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
