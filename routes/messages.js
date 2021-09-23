var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const findContext = (message) => {
  const arrMessage = message.match(/\w+(?:'\w+)*/g);

  let response = '';
  for (let i = 0; i < arrMessage.length; i++) {
    switch (arrMessage[i]) {
      case 'Hello':
        response = "Welcome to StationFive.";
        break;
      case 'Hi':
        response = "Welcome to StationFive.";
        break;
      case 'Goodbye':
        response = "Thank you, see you around.";
        break;
      case 'bye':
        response = "Thank you, see you around.";
        break;
      default:
        if (i === arrMessage.length - 1) {
          response = "Sorry, I don’t understand.";
        }
    }
    if (response !== '') {
      break;
    }
  }
  return response;
};

router.post('/',
  body('conversation_id').exists().isString(),
  body('message').exists().isString(),
  function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const response = findContext(req.body.message);

    res.json({
      response_id: req.body.conversation_id,
      response: response
    });
});

module.exports = router;
