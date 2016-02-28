const request = require('request');
const Discounts = require('../schemas/discounts');
const shortid = require('shortid');

module.exports = function(router){

  router.route('/trigger').post((req, res) => {
    const body = req.body;
    const order = req.query.order;
    const code = shortid.generate();
    Discounts.create({
      shortId: code,
      discount: 5
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