const express = require('express');
const chatroomRouter = require('./chatroomRouter');

const app = express();

app.use(express.json());

app.use('/chatroom', chatroomRouter);

module.exports = app;
