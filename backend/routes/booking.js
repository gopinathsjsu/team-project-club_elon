const router = require("express").Router();
const bookingData = require("../models/bookingData.model");
let Hotel = require("../models/hotel.model");
const Room = require("../models/room.model");
const singleRoom = require("../models/singleRoom.model");

router.route("/createBooking").post((req, res) => {
  const roomName = req.body.room;
  const hotel = req.body.hotel;
  const userId = req.body.userId;
  const amenities = req.body.amenities;
  const bookingTime = req.body.bookingTime;
  const amount = req.body.amount;
  
  const newBookingData = new bookingData({
    roomName,
    userId,
    amenities,
    bookingTime,
    amount,
  });
  //get date in javascript Date format and fill month and day from that date
  //first find difference between dates then move to booking if diff <= 7 days

  let startDate = {
    month: req.body.startDate.month,
    day: req.body.startDate.day,
  };

  let endDate = {
    month: req.body.endDate.month,
    day: req.body.endDate.day,
  };

  if(startDate.month != endDate.month){

  }

  // startDate.month = req.body.startDate.day;
  // startDate.day = req.body.startdate.month;
  // endDate.month = req.body.endDate.day;
  // endDate.day = req.body.enddate.month;

  //getCurrentRoom
  singleRoom
    .find({
      roomName: roomName,
      hotelName: hotel,
    })
    .then((result) => {
      if (!result) res.status(400).send({ message: "Room Not Found" });
      else {
        let roomBooked = false
        console.log(result.length);
        // for (let index = 0; index < array.length; index++) {
        //   const element = array[index];
          
        // }
        result.forEach((currRoom) => {
          if(!roomBooked){
            console.log(roomBooked);
            console.log(currRoom);
            //const currRoom = result[0];
            const bookingsforCurrentMonth =
              currRoom.bookings[startDate.month];
            // const endDateArrayforCurrentMonth = currRoom.endFrom[endDate.month -1].sort()
  
            // console.log(startDateArrayforCurrentMonth);
            // console.log(endDateArrayforCurrentMonth);
  
            let flag = 0;
            for (let i = startDate.day; i <= endDate.day; i++) {
              // console.log(i);
              if (bookingsforCurrentMonth.includes(i)) {
                flag = 1;
                break;
              }
            }
            if (flag) {
              console.log("cannot book");
              // roomBooked = true
              // res.send("Cannot book");
            } else {
              
              console.log("can book");
              roomBooked = true
              for (let i = startDate.day; i <= endDate.day; i++) {
                //   console.log(typeof parseInt(i);
                bookingsforCurrentMonth.push(parseInt(i));
              }
              currRoom.bookings[startDate.month] = bookingsforCurrentMonth;
              console.log(currRoom.bookings);
              // console.log(roomBooked);
              // res.send("updated")
              singleRoom
                .updateOne(
                  {
                    _id: currRoom._id,
                  },
                  {
                    $set: {
                      bookings: currRoom.bookings,
                    },
                  }
                )
                .then((hotels) => {
                  if (!hotels) 
                  {
                    res.status(400).send({ message: "Not found" });
                    
                  }
                  else {
                    roomBooked = true
                    res.send("updated");
                    // newBookingData.save()
                    // .then(() => res.send("updated"))
                    // .catch(err => res.status(400).json('Error: ' + err));
                  }
                })
                .catch((err) => res.status(400).json("Error: " + err));
            }
          }
        });
        if(!roomBooked){
          res.status(400).send("Cannot Book")
        }
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
