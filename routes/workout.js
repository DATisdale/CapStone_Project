//create new workout
//get all workouts - would need to filter on front end
//or 
//get all by certain user - filter on backend

const { Workout } = require("../models/workout");
//const router = require("./users");
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post("/createworkout", [auth], async (req,res) =>{
    try{
        const workout = new Workout({
            name: req.body.name,
            reps:req.body.reps,
            weight: req.body.weight,
            date: req.body.date,
            userId: req.user._id   
        });
        await workout.save();
        return res.send(workout);
    }catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post("/copy", [auth], async (req,res) =>{
    try{
        console.log('exercises', req.body.exercises);
        const workouts = await Workout.insertMany(req.body.exercises)
        // const workout = new Workout({
        //     name: req.body.name,
        //     reps:req.body.reps,
        //     weight: req.body.weight,
        //     date: req.body.date,
        //     userId: req.user._id   
        // });
        // await workout.save();
        return res.send(workouts);
    }catch(ex){
        console.log(ex);
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


 
router.get("/", [auth], async (req, res)=>{
    const workouts = await Workout.find({userId:req.user._id}).sort({date: 1})
    return res.send(workouts)
})

router.delete('/deleteWorkout/:exerciseId', [auth], async (req, res) => {
    const success = await Workout.remove({
        _id: req.params.exerciseId,
        userId: req.user._id
    });
    return res.send(success);
})


module.exports = router;