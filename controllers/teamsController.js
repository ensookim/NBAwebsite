const Teams = require("../models/Teams");

exports.showTeams = (req, res) => {
  Teams.find({})
    .then((teams) => {
      res.locals.teams=teams;
      res.render('teams/index', { teams: teams, title: 'Teams' });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      res.status(500).send('Internal Server Error');
    });
};

exports.deleteTeam = (req, res,next) => {
  const teamId = req.params.id;
  Teams.deleteOne({_id:teamId})
    .then((result) => {
      res.redirect('/teams');
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
      res.status(500).send('Internal Server Error');
      next();
    });
};



exports.edit = (req, res, next) => {
  const teamId = req.params.id;
  Teams.findById(teamId)
    .then((team) => {
      res.render('teams/edit', {
        team: team,
        page: 'edit-teams',
        title: 'Edit Teams',
      });
    })
    .catch((error) => {
      console.log(`Error fetching team by ID: ${error.message}`);
      next(error);
    });
};

exports.update = (req, res, next) => {
  const teamParams = {
    name: req.body.name,
    city: req.body.city,
    region: req.body.region,
  };
  const id=req.body.id;
  Teams.updateOne({_id:id},{name:teamParams.name},{city:teamParams.city, region:teamParams.region})
    .then((team) => {
      res.locals.redirect = '/teams';
      next();
    })
    .catch((error) => {
      console.log(`오류가 발생하였습니다.: ${error.message}`);
      next(error);
    });
};

exports.redirectView = (req, res, next) => {
  const redirectPath = res.locals.redirect;
  if (redirectPath) {
    res.redirect(redirectPath);
  } else {
    next();
  }
};