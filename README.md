# NBA WORLD (first website project) 

NBA WORLD는 웹 프로그래밍 응용 수업에서 진행한 개인 프로젝트입니다. NBA를 정말 좋아해서 이 웹 페이지를 만들어서 다른 사람들에게 공유하고자 했습니다.

REST API 를 구현하여 클라이언트 요청을 받아서 처리하고, 데이터베이스와 상호작용하여 응답을 생성하는 것이 핵심 원리입니다. (Express MiddleWare)

아직 구성이나 기능적인 부분에서 많은 아쉬움과 결함이 있지만 첫 프로잭트인 만큼 배울점이 정말 많은 프로잭트였습니다.

웹크롤링, REST API 등 백앤드의 기초적인 지식과 MongoDB를 연동하여 DB의 기본적인 작동방식과 연동방식을 알게되었습니다.


## 프로잭트 구성

--- 

|-- controllers
    |-- errorController.js
    |-- nbaController.js
    |-- pagesController.js
    |-- subscribersController.js
    |-- talksController.js
    |-- teamsController.js
    |-- usersController.js
|-- models
    |-- NbaPlayers.js
    |-- subscriber.js
    |-- Talk.js
    |-- Teams.js
    |-- User.js
|-- views
    |-- nbaplayers
        |-- edit.ejs
        |-- index.ejs
        |-- new.ejs
    |-- teams
        |-- edit.ejs
        |-- index.ejs
    |-- users
        |-- edit.ejs
        |-- index.ejs
        |-- login.ejs
        |-- new.ejs
        |-- show.ejs
    |-- _pages
        |-- 404.ejs
        |-- 500.ejs
        |-- about.ejs
    |-- _partials
        |-- _confetti.ejs
        |-- _flashMsg.ejs
        |-- _footer.ejs
        |-- _header.ejs
        |-- _navigation.ejs
    |-- index.ejs
    |-- layout.ejs
|-- .gitignore
|-- app.js
|-- package-lock.json
|-- package.json
|-- README.md

)

## 기술
- Node.js
- Express
- REST API
- MongoDB
- EJS

## 개요

- 프로젝트는 서버에 Node.js와 Express를 사용합니다.
- 데이터는 MongoDB에 저장되며 초기 데이터로 데이터베이스를 채우는 시드 파일이 제공됩니다.
- NBA.COM 공식 웹 사이트의 선수 페이지에서 데이터를 스크레이핑하고 웹에 표시합니다.
- 사용자 인증 기능인 로그인, 로그아웃 및 암호 저장을 위한 패스워드 해싱이 구현되었습니다.
- NBA 팀을 관리하기 위한 CRUD(CREATE, READ, UPDATE, DELETE) 작업이 지원됩니다.


## 스크린샷
#### Home 


![main](https://github.com/user-attachments/assets/d2c0ff68-775a-4268-ada8-4daba45a1d6c)


#### About

![About](https://github.com/user-attachments/assets/e2b22383-ea8d-449d-af48-8d8307d62631)



#### Players

![Players](https://github.com/user-attachments/assets/66773670-1610-4147-8f9d-d57ecf15f9c4)


#### Teams

![Teams](https://github.com/user-attachments/assets/4ca4fca5-9a49-45d5-8ceb-063f89b92f8b)



#### Login

![Longin](https://github.com/user-attachments/assets/9496ddbc-28f4-4734-b891-c25a290fb7cc)





