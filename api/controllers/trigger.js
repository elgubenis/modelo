const request = require('request');
const Discounts = require('../schemas/discounts');
const shortid = require('shortid');
const Orders = require('../schemas/orders');
const Users    = require('../schemas/users');

const MAX_RADIUS = 5*111.12;

module.exports = function(router){

  router.route('/trigger').post((req, res) => {
    const body = req.body;
    const order_no = req.query.order_no;
    const code = shortid.generate();

    Discounts.create({
      shortId: code,
      discount: 5
    });

    Orders.findOne({ order_no }).then((result) => {
      const userId = result.userId;
      Users.findById(userId).then((user) => {
        const location = user.location;
        Users.find({
          location: {
            $near: location,
            $maxDistance: MAX_RADIUS
          }
        })
        .then(function(result){
          console.log(result)
        });
      });

    });

    const options = {
      url: 'http://api.pushengage.com/apiv1/notifications',
      headers: {
        api_key: '6f0RtKN4PFh51Cnj3uL0clqbD6H72rge',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      formData: {
        notification_title: 'Pide Chelas con descuento, solo ahora.',
        notification_message: 'Cerca de ti ya estan celebrando, unete ahora y ahorra.',
        notification_url: `http://www.modelo.mobi:8081/code/${code}`,
      }
    };
    request.post(options, (err, httpResponse, body) => {
      if (err) return res.send(err);
      res.send(body);
    });
  });
}