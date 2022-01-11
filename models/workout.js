const mongoose = require("mongoose");

const config = require("config");
const { userSchema } = require("./user");


const workoutSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  reps: { type: Number, required: true, minLength: 3, maxLength: 50 },
  weight: { type: Number, required : true, minLength:1, maxLength:50},
  date:   { type: Date, required : true},
  userId: { type: String}
});





const Workout = mongoose.model("Workout", workoutSchema);
module.exports.Workout = Workout;
module.exports.wourkoutSchema = workoutSchema;