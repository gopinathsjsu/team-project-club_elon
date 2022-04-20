const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingDataSchema = new Schema({
    roomId: { type: String, required: true },
    ownerId:  { type: String, required: true },
    startdate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    amenities: [{ type: String, required: true }],
    bookingTime: { type: Date, required: true },
    amount: { type: Number, required: true }
},
{
    timestamps: true
});

const bookingData = mongoose.model('bookkingData', bookingDataSchema)

module.exports = bookingData;