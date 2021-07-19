const validator = (req, res, next) => {
  const { msg_name, msg_date, msg_content } = req.body;

  console.log(msg_name);
  if (!msg_name || !msg_date || !msg_content) {
    res
      .status(422)
      .send(
        `Missing fields: ${!msg_name ? 'msg_name' : ''} ${
          !msg_date ? 'msg_date' : ''
        } ${!msg_content ? 'msg_content' : ''}`
      );
  } else {
    const errors = [];
    // validate name
    if (msg_name.length < 3) {
      errors.push('msg_name must be longer then 3 chars');
    }
    if (msg_name.length > 10) {
      errors.push('msg_name must be shorter then 10 chars');
    }
    if (msg_name.trim().length !== msg_name.length) {
      errors.push('msg_name must not have leading or trailing spaces');
    }

    if (errors.length > 0) res.send(errors);
    next();
  }
};

module.exports = { validator };
