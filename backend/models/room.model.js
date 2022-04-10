const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomName: { type: String, required: true },
  roomCount: { type: String, required: true },
  roomPrice: { type: String, required: true },
  

}, {
  timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
