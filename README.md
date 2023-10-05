
# First Web Project

이 웹은 2023.3.7~2023.5.7 기간동안 만들었습니다.


## 프로젝트 구조

다음과 같은 MVC 구조를 만들었습니다.




```bash
|___/models                   # <NEW>
| |___User.js                   # 사용자 모델
| |___Subscriber.js             # 구독자 모델
| |___Course.js                 # 과정 모델
| |___Talk.js                   # 발표 모델
| |___Train.js                  # 기차 모델


|___/controllers              # <NEW>
| |___pagesController.js        # 모든 라우트를 처리하는 컨트롤러
| |___errorController.js        # 모든 에러를 처리하는 컨트롤러
| |___usersController.js        # users 모델을 처리하는 컨트롤러
| |___subscribersController.js  # subscribers 모델을 처리하는 컨트롤러
| |___coursesController.js      # courses 모델을 처리하는 컨트롤러
| |___talksController.js        # talks 모델을 처리하는 컨트롤러
| |___trainsController.js       # trains 모델을 처리하는 컨트롤러


|___/data                     # <NEW> 데이터베이스를 채우려면 `node seedModel.js`를 실행하세요
| |___seedUsers.js              # 스타터 사용자 데이터
| |___seedSubscribers.js        # 스타터 구독자 데이터
| |___seedCourses.js            # 스타터 과정 데이터
| |___seedTalks.js              # 스타터 발표 데이터
| |___seedTrains.js             # 스타터 기차 데이터


|___/views
| |___/_pages                 # <NEW>
| |___404.ejs                   # 에러 발생 시 접근 가능
| |___500.ejs                   # 에러 발생 시 접근 가능
| |___about.ejs                 # GET 메소드로 접근 가능
| |___transportation.ejs        # GET 메소드로 접근 가능
| |___/_partials              # <NEW>
| | |___header.ejs              # 모든 페이지에 사용되는 헤더
| | |___footer.ejs              # 모든 페이지에 사용되는 푸터
| | |___navigation.ejs          # 모든 페이지에 사용되는 네비게이션 바
| | |___confetti.ejs            # thanks.html에 사용되는 confetti
| |___/users                  # <NEW>
| | |___edit.ejs                # PUT 메소드로 접근 가능 (update)
| | |___index.ejs               # GET 메소드로 접근 가능 (index)
| | |___new.ejs                 # POST 메소드로 접근 가능 (create)
| | |___show.ejs                # GET 메소드로 접근 가능 (show) = 단일 레코드의 데이터
| |___/subscribers            # <NEW>
| | |___edit.ejs                # PUT 메소드로 접근 가능 (update)
| | |___index.ejs               # GET 메소드로 접근 가능 (index)
| | |___new.ejs                 # POST 메소드로 접근 가능 (create)
| | |___show.ejs                # GET 메소드로 접근 가능 (show) = 단일 레코드의 데이터
| |___/courses                # <NEW>
| | |___edit.ejs                # PUT 메소드로 접근 가능 (update)
| | |___index.ejs               # GET 메소드로 접근 가능 (index)
| | |___new.ejs                 # POST 메소드로 접근 가능 (create)
| | |___show.ejs                # GET 메소드로 접근 가능 (show) = 단일 레코드의 데이터
| |___/talks                  # <NEW>
| | |___edit.ejs                # PUT 메소드로 접근 가능 (update)
| | |___index.ejs               # GET 메소드로 접근 가능 (index)
| | |___new.ejs                 # POST 메소드로 접근 가능 (create)
| | |___show.ejs                # GET 메소드로 접근 가능 (show) = 단일 레코드의 데이터
| |___/trains                 # <NEW>
| | |___edit.ejs                # PUT 메소드로 접근 가능 (update)
| | |___index.ejs               # GET 메소드로 접근 가능 (index)
| | |___new.ejs                 # POST 메소드로 접근 가능 (create)
| | |___show.ejs                # GET 메소드로 접근 가능 (show) = 단일 레코드의 데이터
| |___layout.ejs              # <NEW> 모든 페이지의 레이아웃
| |___index.ejs                 # GET 메소드로 접근 가능


|___/public                   # <NO CHANGES> 안 바뀜
| |___css
| |___img
| |___js


|___main.js                   # <NEW> Express 서버를 설정하는 파일
|___package.json              # <NEW> npm init을 통해 생성된 파일
|___package-lock.json