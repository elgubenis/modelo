Users = require('../schemas/users');

module.exports = function(router){

  router.route('/near_location').get(function(req, res){
    location = req.query.location;
    radius = req.query.radius;
    Users.find({
      location: {
        $near: JSON.parse(location),
        $maxDistance: JSON.parse(radius)
      }
    })
    .then(function(result){
      res.send(result)
    })
    .catch(function(err){
      res.status(500).send(err);
    })
  }).options(function(req, res){
    res.send()
  });
}