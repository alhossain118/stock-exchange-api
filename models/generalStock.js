'use strict';

const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
  symbol: String
});

let Message = mongoose.model('Message', messageSchema)

module.exports = Message;
