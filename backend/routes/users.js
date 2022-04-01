const router = require('express').Router();
const ApiError = require('../errors/ApiError');
let User = require('../models/user.model');

router.route('/here').get((req, res) => {
  const username = req.body.username;
  const age = req.body.age;
  User.find({
    "username" : username,
    "age": age
  })
    .then(users => {
      if(!users)
        res.status(400).send({ message : "Not found" });
      else
        res.send(users);
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

router.route('/add').post((req, res, next) => {
  const username = req.body.username;
  const age = req.body.age;
  if(!username){
    next(ApiError.badRequest("username cannot be empty"));
    return;
  }
//   const newUser = new User({username,age});   

//   newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// }

});

module.exports = router;