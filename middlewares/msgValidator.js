const validator = (req, res, next) => {
  const { msg_name, msg_date, msg_content } = req.body;
  const invalidWords = ['123', 'hello', 'goodbye'];

  if (!msg_name || !msg_date || !msg_content) {
    res.status(422).send(
      `Missing fields: ${!msg_name ? 'msg_name' : ''} 
        ${!msg_date ? 'msg_date' : ''} 
        ${!msg_content ? 'msg_content' : ''}`
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

    // validate date
    if (
      !(new Date(msg_date) instanceof Date) ||
      isNaN(new Date(msg_date).getTime())
    ) {
      errors.push('msg_date must be of Date type');
    }
    if (new Date(msg_date) < new Date()) {
      errors.push(`msg_date must be later later then today's date`);
    }

    // validate content
    if (msg_content.length < 15) {
      errors.push('msg_content must be longer then 15 chars');
    }
    invalidWords.forEach((word) => {
      if (msg_content.includes(word)) {
        errors.push(`msg_content must not contain the string: '${word}'`);
      }
    });

    if (errors.length > 0) {
      res.status(422).send(errors);
    } else {
      next();
    }
  }
};

module.exports = { validator };
