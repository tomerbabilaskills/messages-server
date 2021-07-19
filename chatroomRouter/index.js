const { Router } = require('express');
const { validator } = require('../middlewares/msgValidator');
const messages = require('../database');

const router = Router();

router.get('/', (req, res) => {
  res.send(messages);
});

router.post('/new_msg', validator, (req, res) => {
  messages.push(req.body);
  res.send('validation success');
});

module.exports = router;
