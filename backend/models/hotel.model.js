const mongoose = require('mongoose');
const roomSchema = require('./room.model')

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  hotelName: { type: String, required: true },
  hotelPhone: { type: String, required: true },
  hotelAddress: { type: String, required: true },
  rooms : [roomSchema.schema]

}, {
  timestamps: true,
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
