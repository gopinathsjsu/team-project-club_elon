const router = require("express").Router();
let Hotel = require("../models/hotel.model");
const Room = require("../models/room.model");
const singleRoom = require("../models/singleRoom.model");

router.route("/createBooking").post((req, res) => {
  //   const startDate = req.body.startDate;
  //   const endDate = req.body.endDate;
  //   const roomID = req.body.startDate;
  let startDate = {
    month: 05,
    day: 1,
  };

  let endDate = {
    month: 05,
    day: 14,
  };
  //getCurrentRoom
  singleRoom
    .find({
      _id: "6253551e76133b7c8f7789c5",
    })
    .then((result) => {
      if (!result) res.status(400).send({ message: "Room Not Found" });
      else {
          //convert given date to date objectand check if booking is for less than 7 days (pending)

          

        const currRoom = result[0];
        const bookingsforCurrentMonth = currRoom.bookings[startDate.month - 1];
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
          res.send("Cannot book");
        } else {
          console.log("can book");
          for (let i = startDate.day; i <= endDate.day; i++) {
            //   console.log(typeof parseInt(i);
            bookingsforCurrentMonth.push(parseInt(i));
          }
          currRoom.bookings[startDate.month - 1] = bookingsforCurrentMonth
          console.log(currRoom.bookings);

          singleRoom.updateOne(
            {
              _id: "6253551e76133b7c8f7789c5",
            },
            {
              $set: {
                "bookings": currRoom.bookings
              },
            }
          )
            .then((hotels) => {
              if (!hotels) res.status(400).send({ message: "Not found" });
              else res.send("updated");
            })
            .catch((err) => res.status(400).json("Error: " + err));
        }
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;