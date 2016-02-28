Orders = require('../schemas/orders');
Articles = require('../schemas/articles');

module.exports = function(router){

  router.route('/orders').get(function(req, res){
    Orders.find()
    .then(function(orders){
      res.send(orders);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/orders').post(function(req, res){
    body = req.body;
    Articles.find({ '_id': { $in: req.body.articles } }).then(function(articles){
      var total = 0;
      articles.map(function(article){
        total += article.price
      });

      order = {
        userId: body.userId,
        total: total,
        articles:articles
      }

      Orders.create(order)
      .then(function(order){
        // TODO save in user order_id
        res.send(order);
      })
      .catch(function(err){
        res.status(500).send(err);
      });
    });
  });

  router.route('/orders/:_id').put(function(req, res){
    Orders.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then(function(order){
      res.send(order);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  router.route('/orders/:_id').delete(function(req, res){
    Orders.findByIdAndRemove(req.params._id)
    .then(function(order){
      res.send(order);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

}