// controllers/usersController.js
"use strict";

/**
 * Listing 18.9 (p. 268-269)
 * Listing 18.11 (p. 271)
 * userController.js에서 인덱스 액션 생성과 index 액션의 재방문
 */
const passport = require("passport");
const User = require("../models/User"); // 사용자 모델 요청
const getUserParams = (body) => {
  return {
    username: body.username,
    name: {
      first: body.first,
      last: body.last,
    },
    email: body.email,
    password: body.password,
    profileImg: body.profileImg,
  };
};

module.exports = {
  
  


  //로그인을 뷰
  showlogin: (req, res) => {
    res.render("users/login", {
      page: "login",
      title: "login",
    });
  },
  authenticate:passport.authenticate("local" ,{
    failureRedirect : "/users/login",
    failureFlash : "Faild to login",
    successRedirect : "/",
    successFlash: "Logged in!"
  }),

  
  logout: (req, res, next) => {
    req.logout(() => {
      console.log("loggen out!");

    });
    req.flash("success", "logged out!");
    res.locals.redirect= "/";
    next();
  },
  index: (req, res, next) => {
    User.find() // index 액션에서만 퀴리 실행
      .then((users) => {
        // 사용자 배열로 index 페이지 렌더링
        res.locals.users = users; // 응답상에서 사용자 데이터를 저장하고 다음 미들웨어 함수 호출
        next();
      })
      .catch((error) => {
        // 로그 메시지를 출력하고 홈페이지로 리디렉션
        console.log(`Error fetching users: ${error.message}`);
        next(error); // 에러를 캐치하고 다음 미들웨어로 전달
      });
  },
  indexView: (req, res) => {
    res.render("users/index", {
      page: "users",
      title: "All Users",

    }); // 분리된 액션으로 뷰 렌더링
  },


  /**
   * 노트: 구독자 컨트롤러에서 index 액션이 getAllSubscribers를 대체한다. main.js에서 액션 관련
   * 라우트 index를 가리키도록 수정하고 subscribers.ejs를 index.ejs로 변경된 점을 기억하자. 이
   * 뷰는 views 폴더 아래 subscribers 폴더에 있어야 한다.
   */

  /**
   * Listing 19.2 (p. 278)
   * userController.js에 액션 생성 추가
   */
  // 폼의 렌더링을 위한 새로운 액션 추가
  new: (req, res) => {
    res.render("users/new", {
      page: "new-user",
      title: "New User",
    });
  },

  /**
   * Listing 22.3 (p. 328)
   * userController.js에서 create액션이 플래시 메시지를 추가
   *
   * [노트] 플래시 메시지를 임시로 저장하기 위해 요청 객체를 사용했지만, 응답에서의 로컬 변수와 이
   * 메시지들을 연결했기 때문에 메시지들은 결국 응답 객체로 연결된다.
   */
  create: (req, res, next) => {
    if (req.skip) next(); // 유효성 체크를 통과하지 못하면 다음 미들웨어 함수로 전달

    let newUsernew = User(getUserParams(req.body)); // Listing 22.3 (p. 328)

    User.register(newUsernew, req.body.password, (error, user) =>{
      if (user){
        req.flash("success",`${user.fullName}'s account created!`);
          res.locals.redirect = "/users";
          next();
      } else{
        req.flash("error", `failed to create user acccount because:
        ${error.message}. `);
        res.locals.redirect = "/users/new";
        next();
      }
    });
  },

  validate: (req, res, next) => {
    // 사용자가 입력한 이메일 주소가 유효한지 확인
    req
      .sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true,
      })
      .trim(); // trim()으로 whitespace 제거
    req.check("email", "Email is invalid").isEmail();
    //   .equals(req.body.zipCode); // zipCode 값의 유효성 체크
    req.check("password", "Password cannot be empty").notEmpty(); // password 필드 유효성 체크

    // 사용자가 입력한 비밀번호가 일치하는지 확인
    req.getValidationResult().then((error) => {
      // 앞에서의 유효성 체크 결과 수집
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.skip = true; // skip 속성을 true로 설정
        req.flash("error", messages.join(" and ")); // 에러 플래시 메시지로 추가
        res.locals.redirect = "/users/new"; // new 뷰로 리디렉션 설정
        next();
      } else {
        next(); // 다음 미들웨어 함수 호출
      }
    });
  },
  /**
   * [노트] 폼 데이터를 다시 채우기 위해 다양한 방법을 선택할 수 있다. (연구해보면)
   * 어떤 패키지가 효과적인지 알게 될 것이다. 자신에게 가장 적합한 방법을 찾으면
   * 데이터를 다시 처리하도록 애플리케이션의 모든 폼을 변경하라.
   */

  // 분리된 redirectView 액션에서 뷰 렌더링
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  /**
   * Listing 19.7 (p. 285)
   * userController.js에서 특정 사용자에 대한 show 액션 추가
   */
  show: (req, res, next) => {
    let userId = req.params.id; // request params로부터 사용자 ID 수집
    User.findById(userId) // ID로 사용자 찾기
      .then((user) => {
        res.locals.user = user; // 응답 객체를 통해 다음 믿들웨어 함수로 사용자 전달
        next();
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error); // 에러를 로깅하고 다음 함수로 전달
      });
  },

  // show 뷰의 렌더링
  showView: (req, res) => {
    res.render("users/show", {
      page: "user-details",
      title: "User Details",
    });
  },

  /**
   * Listing 20.6 (p. 294)
   * edit와 update 액션 추가
   */
  // edit 액션 추가
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId) // ID로 데이터베이스에서 사용자를 찾기 위한 findById 사용
      .then((user) => {
        res.render("users/edit", {
          user: user,
          page: "edit-user",
          title: "Edit User",
        }); // 데이터베이스에서 내 특정 사용자를 위한 편집 페이지 렌더링
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  // update 액션 추가
  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = getUserParams(req.body);

    User.findByIdAndUpdate(userId, {
      $set: userParams,
    }) //ID로 사용자를 찾아 단일 명령으로 레코드를 수정하기 위한 findByIdAndUpdate의 사용
      .then((user) => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next(); // 지역 변수로서 응답하기 위해 사용자를 추가하고 다음 미들웨어 함수 호출
      })
      .catch((error) => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },

 


  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId) // findByIdAndRemove 메소드를 이용한 사용자 삭제
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  },
};
