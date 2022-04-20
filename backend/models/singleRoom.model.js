const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const singleroomSchema = new Schema({
  roomName: { type: String, required: true },
  bookings: [[{type: Number , required:true}]],
  
}, {
  timestamps: true,
});

const singleroom = mongoose.model('singleroom', singleroomSchema);

module.exports = singleroom;
