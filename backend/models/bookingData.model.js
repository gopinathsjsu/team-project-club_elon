const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingDataSchema = new Schema({
    roomId: { type: String, required: true },
    ownerId:  { type: String, required: true },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    amenities: [ {
        amenity: {
            type: String
        },
        cost: {
            type: Number
        }
}],
    bookingTime: { type: String, required: true },
    amount: { type: Number }
},
{
    timestamps: true
});

const bookingData = mongoose.model('booking', bookingDataSchema)

module.exports = bookingData;