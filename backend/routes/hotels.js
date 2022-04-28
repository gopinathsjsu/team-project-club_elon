const router = require('express').Router();
let Hotel = require('../models/hotel.model');
const Room = require('../models/room.model');
const singleRoom = require('../models/singleRoom.model')

router.route('/getHotel').get((req, res) => {
  const hotelId = req.body.hotelId;
  Hotel.find({
    "hotelId" : hotelId
  })
    .then(hotels => {
      if(!hotels)
        res.status(400).send({ message : "Hotel Not Found"})
      else
      res.json(hotels)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getHotels').get((req, res) => {
  Hotel.find()
    .then(hotels => {
      if(!hotels)
        res.status(400).send({ message : "Hotel Not Found"})
      else
      res.json(hotels)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/createHotel').post((req, res) => {
  console.log(req.body);
  const hotelName = req.body.hotelName;
  const hotelPhone = Number(req.body.hotelPhone);
  const hotelAddress = req.body.hotelAddress;
  let rooms = []
  const receivedRooms = req.body.rooms
  console.log(receivedRooms);
  receivedRooms.forEach(room => {

    let roomName = room.name
    let roomPrice = room.price
    let roomCount = room.count
    console.log(roomCount);
    let newRoom = new Room({
      roomName,
      roomPrice,
      roomCount,
    });
    rooms.push(newRoom);

    for (let i = 0; i < parseInt(roomCount); i++) {
      console.log(i);
      let bookings = []
      // let endFrom = []
  
      for(j = 0; j<12;j++){
        bookings.push([])
        // endFrom.push([])
    }

    let singleroom = new singleRoom({
      roomName,
      hotelName,
      bookings
    });
    singleroom.save().then((result) => {
    console.log("Room saved:" + result);
      
    }).catch((err) => {
      console.log("error while creating single room");
    });
    
      
    }
  });
  const newHotel = new Hotel({
    hotelName,
    hotelPhone,
    hotelAddress,
    rooms
  });

// console.log(newHotel);
  newHotel.save()
  .then(() => res.json('Hotel added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Hotel.findById(req.params.id)
    .then(hotel => res.json(hotel))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Hotel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Hotel deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/editHotel').put((req, res) => {
  const hotelId = req.body.hotelId;
  const hotelName = req.body.hotelName;
  const hotelPhone = req.body.hotelPhone;
  const hotelAddress = req.body.hotelAddress;

  Hotel.updateOne({
    "hotelId" : hotelId
  },{ $set: { "hotelId": hotelId, "hotelName": hotelName, "hotelPhone": hotelPhone, "hotelAddress": hotelAddress } })
    .then(hotels => {
      if(!hotels)
        res.status(400).send({ message : "Not found" });
      else
        res.send(hotels);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
