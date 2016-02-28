var Users = require('../schemas/users');
const request = require('request');

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
    res.status(200)
  });
  
  router.route('/users/:_id').get(function(req, res){

    const options = {
      url: 'http://api.pushengage.com/apiv1/segments',
      headers: {
        api_key: '6f0RtKN4PFh51Cnj3uL0clqbD6H72rge',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      formData: {
        segment_name: req.params._id,
      }
    };

    request.post(options, (err, httpResponse, body) => {
      Users.findById(req.params._id)
      .select('name lastName image')
      .then(function(result){
        res.send(result);
      })
      .catch(function(err){
        res.status(500).send(err);
      })
    });
  }).options(function(req, res){
    res.status(200)
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
    res.status(200)
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
    res.status(200)
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
    res.status(200)
  });

}