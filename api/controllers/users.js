var Users = require('../schemas/users');

module.exports = function(router){

  router.route('/users').get(function(req, res){
    Users.find()
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  }).options(function(req, res){
    res.send()
  });
  
  router.route('/users/:_id').get(function(req, res){
    Users.findById(req.params._id)
    .select('name lastName image')
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  }).options(function(req, res){
    res.send()
  });

  router.route('/users').post(function(req, res){
    Users.create(req.body)
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  }).options(function(req, res){
    res.send()
  });

  router.route('/users/:_id').put(function(req, res){
    Users.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  }).options(function(req, res){
    res.send()
  });

  router.route('/users/:_id').delete(function(req, res){
    Users.findByIdAndRemove(req.params._id)
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  }).options(function(req, res){
    res.send()
  });

}