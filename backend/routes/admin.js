const router = require("express").Router();
const ApiError = require("../errors/ApiError");
let User = require("../models/user.model");
const bcrypt = require("bcrypt");
const bookingData = require("../models/bookingData.model");
let Hotel = require("../models/hotel.model");
const Room = require("../models/room.model");
const singleRoom = require("../models/singleRoom.model");

router.route("/login").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.find({
    username: "admin",
  })
    .then(async (user) => {
      if (user.length == 0) {
        {
          res.status(200).send("Wrong username password combination!");
        }
      } else if (user) {
        let verified = await bcrypt.compare(password, user[0].password);
        if (verified) {
          res.status(200).send("Logged in!");
        } else if (!verified) {
          res.status(200).send("Wrong username password combination");
        }
      }
    })
    .catch((err) => res.status(200).json("Error: " + err));
});

router.route("/delete").delete((req, res) => {
  const username = req.body.username;
  // const age = req.body.age;
  User.deleteOne({
    username: username,
  })
    .then((users) => {
      if (!users) res.status(200).send({ message: "Not found" });
      else res.send(users);
    })
    .catch((err) => res.status(200).json("Error: " + err));
});

router.route("/update").put((req, res) => {
  const username = req.body.username;
  // const age = req.body.age;
  User.updateOne(
    {
      username: username,
    },
    { $set: { age: 10 } }
  )
    .then((users) => {
      if (!users) res.status(200).send({ message: "Not found" });
      else res.send(users);
    })
    .catch((err) => res.status(200).json("Error: " + err));
});

router.route("/createBooking").post((req, res) => {
  console.log("Booking your room.....");
  const roomName = req.body.room;
  const hotel = req.body.hotel;
  const userName = "admin@gmail.com";
  const amenities = [];
  const amount = 0;
  // const bookingTime = req.body.bookingTime;
  // const amount = req.body.amount;

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

  singleRoom
    .find({
      roomName: roomName,
      hotelName: hotel,
    })
    .then((result) => {
      if (!result) res.status(400).send({ message: "Room Not Found" });
      else {
        let roomBooked = false;
        console.log(result.length);
        // for (let index = 0; index < array.length; index++) {
        //   const element = array[index];

        // }

        for (let m = 0; m < result.length; m++) {
          let currRoom = result[m];
          if (!roomBooked) {
            console.log(roomBooked);
            // console.log(currRoom);
            //const currRoom = result[0];
            if (startDate.month != endDate.month) {
              let canBook1 = false;
              let canBook2 = false;

              //handle first month
              let bookingsforCurrentMonth =
                currRoom.bookings[startDate.month - 1];
              let flag = 0;

              for (let i = startDate.day; i <= 31; i++) {
                // console.log(i);
                if (bookingsforCurrentMonth.includes(i)) {
                  flag = 1;
                  break;
                }
              }
              console.log(flag);
              console.log(":::::::::::::::::::::::::::::::::::::::::::")
              if (flag) {
                console.log("cannot book for multiple dates");
                continue;
              } else {
                
                canBook1 = true;
                //handle second month

                let bookingsforCurrentMonth2 =
                  currRoom.bookings[startDate.month - 1];
                for (let i = 1; i <= endDate.day; i++) {
                  
                  // console.log(i);
                  if (bookingsforCurrentMonth2.includes(i)) {
                    flag = 1;
                    break;
                  }
                }
                if (flag) {
                  console.log("cannot book for multiple dates");
                  continue
                } else {
                  canBook2 = true;
                }
              }

              if (canBook1 && canBook2 && !roomBooked) {
                console.log("can book for different months");
                let bookingsforCurrentMonthNew1 = []
                let bookingsforCurrentMonthNew2 = []
                for (let i = startDate.day; i <= 31; i++) {
                  //   console.log(typeof parseInt(i);
                  bookingsforCurrentMonthNew1.push(parseInt(i));
                }
                for (let i = 1; i <= endDate.day; i++) {
                  //   console.log(typeof parseInt(i);
                  bookingsforCurrentMonthNew2.push(parseInt(i));
                }
                console.log(bookingsforCurrentMonthNew1);
                console.log(bookingsforCurrentMonthNew2);
                currRoom.bookings[startDate.month - 1] =
                  bookingsforCurrentMonthNew1;
                currRoom.bookings[endDate.month - 1] =
                  bookingsforCurrentMonthNew2;
                console.log(currRoom.bookings);
                roomBooked = true
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
                  .then((responseBooking) => {
                    if (!responseBooking) {
                      res.status(400).send({ message: "Not found" });
                    } else {
                      roomBooked = true
                      
                      // roomBooked = true
                      // res.send("updated");
                      let roomId = currRoom._id;
                      console.log(roomBooked);
                      console.log("_________________________________________");
                      console.log(roomId);
                      let startdate =
                        startDate.month + "/" + startDate.day + "/" + "2022";
                      let enddate =
                        endDate.month + "/" + endDate.day + "/" + "2022";
                      //let amenities = [{amenity:"parking", cost:10}, {amenity:"spa", cost:20}, {amenity:"gym", cost:30}]
                      let ownerId = userName;
                      let bookingTime = new Date().toLocaleString();
                      //let amount = 200
                      const newBookingData = new bookingData({
                        roomId,
                        ownerId,
                        startdate,
                        enddate,
                        amenities,
                        bookingTime,
                        amount,
                      });
                      newBookingData
                        .save()
                        .then(() => {
                          roomBooked = true
                          res.send("updated")

                        })
                        .catch((err) => {
                          console.log(err);
                          // res.status(400).json("Error: " + err);
                        });
                    }
                  })
                  .catch((err2) => {
                    console.log(err2);
                    // res.status(400).json("Error: " + err2);
                  });
              } else {
                break;
              }
            } else {
              const bookingsforCurrentMonth =
                currRoom.bookings[startDate.month - 1];
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
                roomBooked = true;
                for (let i = startDate.day; i <= endDate.day; i++) {
                  //   console.log(typeof parseInt(i);
                  bookingsforCurrentMonth.push(parseInt(i));
                }
                currRoom.bookings[startDate.month - 1] =
                  bookingsforCurrentMonth;
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
                  .then((responseBooking) => {
                    if (!responseBooking) {
                      res.status(400).send({ message: "Not found" });
                    } else {
                      // roomBooked = true
                      // res.send("updated");
                      let roomId = currRoom._id;
                      console.log("_________________________________________");
                      console.log(roomId);
                      let startdate =
                        startDate.month + "/" + startDate.day + "/" + "2022";
                      let enddate =
                        endDate.month + "/" + endDate.day + "/" + "2022";
                      //let amenities = [{amenity:"parking", cost:10}, {amenity:"spa", cost:20}, {amenity:"gym", cost:30}]
                      let ownerId = userName;
                      let bookingTime = new Date().toLocaleString();
                      //let amount = 200
                      const newBookingData = new bookingData({
                        roomId,
                        ownerId,
                        startdate,
                        enddate,
                        amenities,
                        bookingTime,
                        amount,
                      });
                      newBookingData
                        .save()
                        .then(() => res.send("updated"))
                        .catch((err) => {
                          console.log(err);
                          // res.status(400).json("Error: " + err);
                        });
                    }
                  })
                  .catch((err2) => {
                    console.log(err2);
                    // res.status(400).json("Error: " + err2);
                  });
              }
            }
          }
        }
        if (!roomBooked) {
          res.status(400).send("Cannot Book, Already Booked");
        }
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/showbookings").get((req, res) => {
  bookingData
    .find({ownerId: {$ne:"admin@gmail.com"}})
    .then((bookings) => {
      if (!bookings) res.status(200).send({ message: "Hotel Not Found" });
      else res.json(bookings);
    })
    .catch((err) => res.status(200).json("Error: " + err));
});

module.exports = router;
