const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");


const userSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  height: { type: String, required : true, minLength:1, maxLength:50},
  weight: { type: String, required : true, minLength:1, maxLength:50},
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  password: { type: String, required: true, minLength: 5, maxLength: 1024 },
  isAdmin: { type: Boolean, required: true },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("JWT_SECRET")
  );
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    isAdmin: Joi.bool().required(),
    height: Joi.string().min(1).max(50).required(),
    weight: Joi.string().min(1).max(50).required(),
  });
  return schema.validate(user);
};

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
};



const User = mongoose.model("User", userSchema);
module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
module.exports.validateLogin = validateLogin;