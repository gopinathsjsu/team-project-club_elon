const express = require("express");
const router = express.Router();


let amenitiesList = [
    {
        "amenity" : "Parking", 
        "price" :10
    },
    {
        "amenity" : "spa", 
        "price" : 20
    },
    {
        "amenity" : "Gym", 
        "price" : 30
    },
    {
        "amenity" : "Play Area", 
        "price" : 20
    },
    {
        "meals" : "Meals",
        "price" : 30
    }
]

router.route("/").get((req,res) => {
    res.send(amenitiesList);
})

module.exports = router;
