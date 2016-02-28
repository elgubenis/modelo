Articles = require('../schemas/articles');

module.exports = function(router){

  router.route('/articles').get(function(req, res){
    Articles.find()
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  }).options(function(req, res){
    res.send()
  });

  router.route('/articles/:_id').get(function(req, res){
    Articles.findById(req.params._id)
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  }).options(function(req, res){
    res.send()
  });

  router.route('/articles').post(function(req, res){
    Articles.create(req.body)
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  }).options(function(req, res){
    res.send()
  });

  router.route('/articles/:_id').put(function(req, res){
    Articles.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  }).options(function(req, res){
    res.send()
  });

  router.route('/articles/:_id').delete(function(req, res){
    Articles.findByIdAndRemove(req.params._id)
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