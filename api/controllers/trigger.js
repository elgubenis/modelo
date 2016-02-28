const request = require('request');

module.exports = function(router){

  router.route('/trigger').post((req, res) => {
    const body = req.body;
    const user = req.query.user;
    const options = {
      url: 'http://api.pushengage.com/apiv1/notifications',
      headers: {
        api_key: '6f0RtKN4PFh51Cnj3uL0clqbD6H72rge',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      formData: {
        notification_title: 'Pide Chelas con descuento, solo ahora.',
        notification_message: 'Cerca de ti ya estan celebrando, unete ahora y ahorra.',
        notification_url: 'URL',
      }
    };
    request.post(options, (err, httpResponse, body) => {
      if (err) return res.send(err);
      res.send(body);
    });
  });
}