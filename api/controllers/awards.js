const Awards = require('../schemas/awards');

module.exports = function(router){

  router.route('/awards').get(function(req, res){
    Awards.find()
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/awards/:_id').get(function(req, res){
    Awards.findById(req.params._id)
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/awards').post(function(req, res){
    Awards.create(req.body)
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/awards/:_id').put(function(req, res){
    Awards.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/awards/:_id').delete(function(req, res){
    Awards.findByIdAndRemove(req.params._id)
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

}