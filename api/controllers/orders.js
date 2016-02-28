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
    articleIds = [];
    body.articles.map(function(article){
      articleIds.push(article._id)
    });

    Articles.find({ '_id': { $in: articleIds } })
    .lean()
    .then(function(articles){
      var total = 0;
      articles.map(function(articlePrice){
        body.articles.map(function(articleQuantity){
          if(articlePrice._id == articleQuantity._id){
            total += articlePrice.price * articleQuantity.quantity
            return articlePrice.quantity = articleQuantity.quantity
          }
        })
      });

      order = {
        userId: body.userId,
        total: total,
        articles:articles
      }

      Orders.create(order)
      .then(function(order){
        // TODO save
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