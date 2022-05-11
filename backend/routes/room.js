const router = require("express").Router();
const singleRoom = require("../models/singleRoom.model");

router.route("/getroom").get((req, res) => {
  const roomId = req.query.roomId;
  console.log(roomId);
  singleRoom.find(
    {
      _id: roomId,
    },
    (err, room) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else {
        console.log(room);
        res.json({ room: room[0].roomName, hotel: room[0].hotelName });
      }
    }
  );
});

module.exports = router;
