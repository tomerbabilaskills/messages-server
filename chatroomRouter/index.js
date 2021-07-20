const { Router } = require('express');
const { validator } = require('../middlewares/msgValidator');
const messages = require('../database');

const router = Router();

router.get('/', (req, res) => {
  res.send(
    messages.sort((a, b) => {
      return new Date(a.msg_date) - new Date(b.msg_date);
    })
  );
});

router.post('/new_msg', validator, (req, res) => {
  messages.push(req.body);
  res.send('validation success');
});

module.exports = router;
