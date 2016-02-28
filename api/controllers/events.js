const Events = require('../schemas/events');

module.exports = function(router){

  router.route('/events').get(function(req, res){
    Events.find()
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/events/:_id').get(function(req, res){
    Events.findById(req.params._id)
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/events').post(function(req, res){
    Events.create(req.body)
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/events/:_id').put(function(req, res){
    Events.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/events/:_id').delete(function(req, res){
    Events.findByIdAndRemove(req.params._id)
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

}