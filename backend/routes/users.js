const router = require("express").Router();
const ApiError = require("../errors/ApiError");
let User = require("../models/user.model");
const bookingData = require("../models/bookingData.model");
const bcrypt = require("bcrypt");
const singleroom = require("../models/singleRoom.model");

router.route("/login").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.find({
    username: username,
  })
    .then(async (user) => {
      if (user.length == 0) {
        {
          res.status(400).send("Wrong username password combination!");
        }
      } else if (user) {
        let verified = await bcrypt.compare(password, user[0].password);
        if (verified) {
          res.status(200).send("Logged in!");
        } else if (!verified) {
          res.status(400).send("Wrong username password combination");
        }
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete").delete((req, res) => {
  const username = req.body.username;
  // const age = req.body.age;
  User.deleteOne({
    username: username,
  })
    .then((users) => {
      if (!users) res.status(400).send({ message: "Not found" });
      else res.send(users);
    })
    .catch((err) => res.status(400).json("Error: " + err));
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
      if (!users) res.status(400).send({ message: "Not found" });
      else res.send(users);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/register").post(async (req, res, next) => {
  // console.log(req.body)
  const username = req.body.username;
  const reqPassword = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(reqPassword, salt);
  // console.log(typeof hashPassword);
  // const age = req.body.age;
  let rewards = 0;
  if (!username) {
    next(ApiError.badRequest("username cannot be empty"));
    return;
  }
  const newUser = new User({ username, password, rewards });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/mybookings").get((req, res) => {
  const ownerId = req.query.ownerId;
  console.log(ownerId);
  bookingData
    .find({
      ownerId: ownerId,
    })
    .then((bookings) => {
      if (!bookings) res.status(400).send({ message: "Hotel Not Found" });
      else res.json(bookings);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/updateRewards").post((req, res) => {
  const username = req.body.username;
  const newRewards = req.body.rewards;
  console.log(newRewards);
  User.updateOne(
    {
      username: username,
    },
    {
      $set: {
        rewards: newRewards,
      },
    }
  )
    .then((result) => {
      res.send("Rewards Updated");
    })
    .catch((err) => {
      res.send(err);
    });
});

router.route("/getRewards").get((req, res) => {
  const username = req.query.username;

  User.find({
    username: username,
  })
    .then(async (user) => {
      if (user.length == 0) {
        {
          res.status(400).send("Wrong username password combination!");
        }
      } else if (user) {
        console.log(user);
        res.status(200).send({ rewards: user[0].rewards });
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
