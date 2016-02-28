const request = require('request');

module.exports = function(router){

  router.route('/trigger').post((req, res) => {
    const body = req.body;
    const options = {
      url: 'http://api.pushengage.com/apiv1/notifications',
      headers: {
        api_key: '6f0RtKN4PFh51Cnj3uL0clqbD6H72rge',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      formData: {
        notification_title: body.title,
        notification_message: body.message,
        notification_url: body.url,
        include_segments: ['56d28dabb23bf0423c8e12a9'],
      }
    };
    request.post(options, (err, httpResponse, body) => {
      if (err) return res.send(err);
      console.log(body);
      res.send(body);
    });
  });

}