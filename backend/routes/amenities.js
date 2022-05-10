const router = require('express').Router();

let amenitiesList = [
    {
        "amenity" : "Parking", 
        "price" :10
    },
    {
        "amenity" : "Spa", 
        "price" : 20
    },
    {
        "amenity" : "Gym", 
        "price" : 30
    },
    {
        "amenity" : "Play Area", 
        "price" : 20
    }
]

router.route("/").get((req,res) => {
    res.send(amenitiesList);
})
