const router = require("express").Router();
const bookingData = require("../models/bookingData.model");
let Hotel = require("../models/hotel.model");
const Room = require("../models/room.model");
const singleRoom = require("../models/singleRoom.model");
const userBookings = require("../models/bookingData.model");

router.route("/createBooking").post((req, res) => {
  console.log("Booking your room.....");
  const roomName = req.body.room;
  const hotel = req.body.hotel;
  const userName = req.body.userName;
  const amenities = req.body.amenities;
  const amount = req.body.amount;
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

router.route("/changeBooking").post((req, res) => {
  console.log("Changing your Booking.....");

  const roomName = req.body.room;
  const hotel = req.body.hotel;
  const userName = req.body.userName;
  const amenities = req.body.amenities;
  const amount = req.body.amount;
  const previousRoomID = "62687ec4faa5de59228c5e3a";
  const prevStartdate = null;
  const prevEnddate = null;

  //first cancel previous booking then create new booking
  // console.log(userName);
  userBookings
    .findOne({
      roomId: previousRoomID,
      ownerId: userName,
    })
    .then((result) => {
      console.log(result);
      let startDate = result.startdate.split("/");
      let endDate = result.enddate.split("/");
      // console.log(startDate);
      let prevStartdate = {
        month: startDate[0],
        day: startDate[1],
      };

      let prevEnddate = {
        month: endDate[0],
        day: endDate[1],
      };
      console.log(prevEnddate);
      console.log(prevStartdate);

      singleRoom
        .findOne({
          roomId: previousRoomID,
        })
        .then((result2) => {
          console.log(result2);
          let bookings = result2.bookings;
          console.log(bookings[prevEnddate.month]);
          for (
            let k = parseInt(prevStartdate.day);
            k <= parseInt(prevEnddate.day);
            k++
          ) {
            console.log(k);
            let index = bookings[prevEnddate.month].indexOf(k);
            console.log(index);
            if (index > -1) {
              bookings[prevEnddate.month].splice(index, 1); // 2nd parameter means remove one item only
            }
            singleRoom
              .updateOne(
                {
                  _id: previousRoomID,
                },
                {
                  $set: {
                    bookings: bookings,
                  },
                }
              )
              .then((result3) => {
                console.log(result3);
                console.log("Old bookings deleted. Creting new bookings....");
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
                    if (!result)
                      res.status(400).send({ message: "Room Not Found" });
                    else {
                      let roomBooked = false;
                      console.log(result.length);
                      // for (let index = 0; index < array.length; index++) {
                      //   const element = array[index];

                      // }
                      result.forEach((currRoom) => {
                        if (!roomBooked) {
                          console.log(roomBooked);
                          console.log(currRoom);
                          //const currRoom = result[0];
                          if (startDate.day > endDate.day) {
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
                              for (
                                let i = startDate.day;
                                i <= endDate.day;
                                i++
                              ) {
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
                                    res
                                      .status(400)
                                      .send({ message: "Not found" });
                                  } else {
                                    // roomBooked = true
                                    // res.send("updated");
                                    let roomId = currRoom._id;
                                    console.log(
                                      "_________________________________________"
                                    );
                                    console.log(roomId);
                                    let startdate =
                                      startDate.month +
                                      "/" +
                                      startDate.day +
                                      "/" +
                                      "2022";
                                    let enddate =
                                      endDate.month +
                                      "/" +
                                      endDate.day +
                                      "/" +
                                      "2022";
                                    //let amenities = [{amenity:"parking", cost:10}, {amenity:"spa", cost:20}, {amenity:"gym", cost:30}]
                                    let ownerId = userName;
                                    let bookingTime =
                                      new Date().toLocaleString();
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
                                        res.status(400).json("Error: " + err);
                                      });
                                  }
                                })
                                .catch((err2) => {
                                  console.log(err2);
                                  res.status(400).json("Error: " + err2);
                                });
                            }
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
                                  res
                                    .status(400)
                                    .send({ message: "Not found" });
                                } else {
                                  // roomBooked = true
                                  // res.send("updated");
                                  let roomId = currRoom._id;
                                  console.log(
                                    "_________________________________________"
                                  );
                                  console.log(roomId);
                                  let startdate =
                                    startDate.month +
                                    "/" +
                                    startDate.day +
                                    "/" +
                                    "2022";
                                  let enddate =
                                    endDate.month +
                                    "/" +
                                    endDate.day +
                                    "/" +
                                    "2022";
                                  let amenities = [
                                    { amenity: "parking", cost: 10 },
                                    { amenity: "spa", cost: 20 },
                                    { amenity: "gym", cost: 30 },
                                  ];
                                  let ownerId = userName;
                                  let bookingTime = new Date().toLocaleString();
                                  let amount = 200;
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
                                      res.status(400).json("Error: " + err);
                                    });
                                }
                              })
                              .catch((err2) => {
                                console.log(err2);
                                res.status(400).json("Error: " + err2);
                              });
                          }
                        }
                      });
                      if (!roomBooked) {
                        res.status(400).send("Cannot Book");
                      }
                    }
                  })
                  .catch((err) => res.status(400).json("Error: " + err));
              })
              .catch((err3) => {
                console.log(err3);
              });
          }
        })
        .catch((err2) => {
          console.log(err2);
        });
    })
    .catch((err) => {
      console.log(err9);
      res.status(400).send(err9);
    });
});

router.route("/cancelBooking").delete((req, res) => {
  console.log("Cancelling your Booking.....");

  const bookingId = req.query.bookingId;
  res.setHeader("Content-Type", "application/json");
  bookingData.deleteOne({ _id: bookingId }, (err, result) => {
    if (err) {
      res.status(400).json("Error: " + err);
    }
  });
  const roomName = req.body.room;
  const hotel = req.body.hotel;
  const userName = req.query.userName;
  const amenities = req.body.amenities;
  const amount = req.body.amount;
  const previousRoomID = req.query.previousRoomID;
  const prevStartdate = null;
  const prevEnddate = null;
  console.log(req.query);
  //first cancel previous booking then create new booking
  // console.log(userName);
  userBookings
    .findOne({
      roomId: previousRoomID,
      ownerId: userName,
    })
    .then((result) => {
      console.log(result);
      let startDate = result.startdate.split("/");
      let endDate = result.enddate.split("/");
      // console.log(startDate);
      let prevStartdate = {
        month: startDate[0],
        day: startDate[1],
      };

      let prevEnddate = {
        month: endDate[0],
        day: endDate[1],
      };
      console.log(prevEnddate);
      console.log(prevStartdate);

      singleRoom
        .findOne({
          roomId: previousRoomID,
        })
        .then((result2) => {
          console.log(result2);
          let bookings = result2.bookings;
          console.log(bookings[prevEnddate.month]);
          for (
            let k = parseInt(prevStartdate.day);
            k <= parseInt(prevEnddate.day);
            k++
          ) {
            console.log(k);
            let index = bookings[prevEnddate.month].indexOf(k);
            console.log(index);
            if (index > -1) {
              bookings[prevEnddate.month].splice(index, 1); // 2nd parameter means remove one item only
            }
            singleRoom
              .updateOne(
                {
                  _id: previousRoomID,
                },
                {
                  $set: {
                    bookings: bookings,
                  },
                }
              )
              .then((result3) => {
                console.log(result3);
              })
              .catch((err3) => {
                console.log(err3);
              });
          }

          console.log("Booking Cancelled");
          res.send("Booking Cancelled");
        })
        .catch((err2) => {
          console.log(err2);
          res.send(err2);
        });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
