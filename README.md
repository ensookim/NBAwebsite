# NBA WORLD (first website project) 

NBA WORLD는 웹 프로그래밍 응용 수업에서 진행한 개인 프로젝트입니다. NBA를 정말 좋아해서 이 웹 페이지를 만들어서 다른 사람들에게 공유하고자 했습니다.

REST API 를 구현하여 클라이언트 요청을 받아서 처리하고, 데이터베이스와 상호작용하여 응답을 생성하는 것이 핵심 원리입니다. (Express MiddleWare)

아직 구성이나 기능적인 부분에서 많은 아쉬움과 결함이 있지만 첫 프로잭트인 만큼 배울점이 정말 많은 프로잭트였습니다.

웹크롤링, REST API 등 백앤드의 기초적인 지식과 MongoDB를 연동하여 DB의 기본적인 작동방식과 연동방식을 알게되었습니다.


## 프로잭트 구성



|-- controllers<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- errorController.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- nbaController.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- pagesController.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- subscribersController.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- talksController.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- teamsController.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- usersController.js<br>
|-- models<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- NbaPlayers.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- subscriber.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- Talk.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- Teams.js<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- User.js<br>
|-- views<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- nbaplayers<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- edit.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- index.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- new.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- teams<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- edit.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- index.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- users<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- edit.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- index.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- login.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- new.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- show.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- _pages<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- 404.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- 500.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- about.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- _partials<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- _confetti.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- _flashMsg.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- _footer.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- _header.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- _navigation.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- index.ejs<br>
&nbsp;&nbsp;&nbsp;&nbsp;|-- layout.ejs<br>
|-- .gitignore<br>
|-- app.js<br>
|-- package-lock.json<br>
|-- package.json<br>
|-- README.md<br>

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


---

### 진행하며 느낀점

- 하나하나 책을보며 따라하고, 이해하고, 또 고민하고 실망하고, 정말 애증이 많은 프로잭트다.
- 허술하고 개선해야하는 부분이 정말 많다. 구현을 못한 부분도, 마음에 안드는 부분도 너무 많다. 배움에는 끝이 없다. 
- 모르는 것을 부끄러워 하지말자. 이 프로잭트를 하면서 물어보고, 검색하고 정말 몇백번은 더 했다.
- 결국엔 이런 작은 어설픈 프로잭트가 목표로 가는 발판이라고 생각한다.
- 화이팅



### 추가부분

- Team, Player 크롤링 방식 변경하여 기존 하드코딩(로컬 이미지)된 Teams 크롤링완성, DB 저장 완료
- Team, Player 에서 NBA 링크로 연결되는 기능 추가





