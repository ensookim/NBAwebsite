const axios = require('axios'); // axios 모듈 가져오기
const cheerio = require('cheerio'); // cheerio 모듈 가져오기
const mongoose = require('mongoose'); // mongoose 모듈 가져오기
const Team = require('../models/Teams'); // Teams 모델 가져오기

// MongoDB 연결 설정
mongoose.connect('mongodb://127.0.0.1:27017/ut-nodejs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 크롤링 함수
const crawlAndSaveTeams = async () => {
  try {
    console.log('크롤링 시작...');
    const url = 'https://www.nba.com/teams';
    const { data: html } = await axios.get(url); // axios로 페이지 가져오기
    const $ = cheerio.load(html); // cheerio로 HTML 로드

    const teams = [];

    // 각 팀의 정보 추출
    $('div.TeamDivisions_divisionTeams__N6vcW').each((index, element) => {
      // 각 팀 요소를 찾기
      $(element).find('.TeamFigure_tf__jA5HW').each((i, teamElement) => {
        // 팀 로고 이미지 URL 추출
        const teamImage = $(teamElement).find('img.TeamLogo_logo__PclAJ').attr('src');
        console.log('로고:', teamImage);

        // 팀 이름 추출
        const teamNameElement = $(teamElement).find('a.TeamFigure_tfMainLink__OPLFu');
        const teamName = teamNameElement.text().trim();
        console.log('팀 이름:', teamName);

        // 팀 ID 추출 (이미지 URL에서 중간 숫자 부분 추출)
        const teamIdMatch = teamImage.match(/nba\/(\d+)\/primary/); // 정규 표현식으로 ID 추출
        const teamId = teamIdMatch ? teamIdMatch[1] : null;
        console.log('팀 ID:', teamId);

        // 팀 지역 정보 추출
        const regionElement = $(element).prev('.TeamDivisions_divisionName__KFlSk');
        const region = regionElement.text().trim();
        console.log('지역:', region);

        // 유효한 팀 정보 확인
        if (teamId && teamName && teamImage && region) {
          teams.push({
            name: teamName,
            image: teamImage,
            Id: teamId,
            region: region,
          });
        } else {
          console.log(`팀 정보가 유효하지 않습니다: ${teamName}, ID: ${teamId}, Region: ${region}`);
        }
      });
    });

    // 크롤링한 팀 데이터 출력
    console.log('크롤링한 팀 데이터:', teams);

    // DB에 팀 정보 저장 (중복된 값은 수정)
    if (teams.length > 0) {
      for (const team of teams) {
        await Team.updateOne(
          { name: team.name }, // 팀 이름으로 찾기
          { $set: team }, // 팀 정보 업데이트
          { upsert: true } // 팀이 없으면 새로 추가
        );
      }
      console.log('성공적으로 크롤링 후 DB에 저장하였습니다.');
    } else {
      console.log('저장할 팀 데이터가 없습니다.');
    }
  } catch (error) {
    console.log(`크롤링 중 오류 발생: ${error}`);
  } finally {
    mongoose.connection.close(); // MongoDB 연결 종료
  }
};

// 크롤링 실행
crawlAndSaveTeams();
