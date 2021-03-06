const Discounts = require('../schemas/discounts');

module.exports = function(router){

  router.route('/discounts').get(function(req, res){
    Discounts.find()
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/discounts/:shortid').get(function(req, res){
    Discounts.findOne({ shortId: req.params.shortid })
    .then(function(result) {
      result = result.toObject();
      const now = new Date().getTime();
      const old = new Date(result.start).getTime();
      if ((now-old)/1000 > 20) {
        result.discount = undefined;
      }
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/discounts').post(function(req, res){
    Discounts.create(req.body)
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/discounts/:_id').put(function(req, res){
    Discounts.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/discounts/:_id').delete(function(req, res){
    Discounts.findByIdAndRemove(req.params._id)
    .then(function(result){
      res.send(result);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

}