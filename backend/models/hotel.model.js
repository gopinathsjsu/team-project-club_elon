const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  hotelId: {type: String, required: true },
  hotelName: { type: String, required: true },
  hotelPhone: { type: Number, required: true },
  hotelAddress: { type: String, required: true }
}, {
  timestamps: true,
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
