// errorController.js
"use strict";

const httpStatus = require("http-status-codes");


exports.logErrors = (err, req, res, next) => {
  console.error(err.stack); // 에러 스택 로깅
  next(err); // 다음 미들웨어 함수로 에러 전달
};

//에러 처리 라우트

exports.resNotFound = (req, res) => {
  // 앞에서 처리되지 못한 모든 요청 처리
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.render("_pages/404", {
    page: "404",
    title: "Not Found",
    error: errorCode,
    message: "The page you are looking for does not exist.",
  });
};

exports.resInternalError = (err, req, res, next) => {
  // 내부 서버 에러의 처리
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.error(`ERROR occurred: ${err.stack}`);
  res.status(errorCode);
  res.render("_pages/500", {
    page: "500",
    title: "Internal Server Error",
    error: errorCode,
    message: "Something went wrong on the server.",
  });
};

