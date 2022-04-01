const router = require('express').Router();
const ApiError = require('../errors/ApiError');
let User = require('../models/user.model');
const bcrypt = require('bcrypt');


router.route('/login').get((req, res) => {
  const username = req.body.username;
  const password = req.body.password;


  User.find({
    "username" : username,
  })
    .then(async (user) => {
      if(user.length == 0)
      {
        {res.status(400).send("Wrong username password combination!");}
      }
      else if(user){
      let verified = await bcrypt.compare(password, user[0].password)
      if (verified){res.status(200).send("Logged in!");}
      else if(!verified){res.status(400).send("Wrong username password combination");}

      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').delete((req, res) => {
  const username = req.body.username;
  // const age = req.body.age;
  User.deleteOne({
    "username" : username
  })
    .then(users => {
      if(!users)
        res.status(400).send({ message : "Not found" });
      else
        res.send(users);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').put((req, res) => {
  const username = req.body.username;
  // const age = req.body.age;
  User.updateOne({
    "username" : username
  },{ $set: { "age": 10 } })
    .then(users => {
      if(!users)
        res.status(400).send({ message : "Not found" });
      else
        res.send(users);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post( async (req, res, next) => {
  // console.log(req.body)
  const username = req.body.username;
  const reqPassword = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(reqPassword, salt)
  // console.log(typeof hashPassword);
  // const age = req.body.age;
  if(!username){
    next(ApiError.badRequest("username cannot be empty"));
    return;
  }
  const newUser = new User({username, password});   

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

);

module.exports = router;