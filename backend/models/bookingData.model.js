const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingDataSchema = new Schema({
    roomId: { type: String, required: true },
    ownerId:  { type: String, required: true },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    amenities: [ {
        amenity: {
            type: String,
            required : true,
        },
        cost: {
            type: Number,
            required : true, 
        }
}],
    bookingTime: { type: String, required: true },
    amount: { type: Number, required: true }
},
{
    timestamps: true
});

const bookingData = mongoose.model('booking', bookingDataSchema)

module.exports = bookingData;