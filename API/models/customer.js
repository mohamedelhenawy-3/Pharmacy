const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
//joi for validation
const Joi = require("joi");
const { join } = require("lodash");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 0,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 0,
    max: 255,
  },
  phoneNumber: {
    type: String,
    required: true,
    length: 11,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 1,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1500,
  },
  //to  make admin and have rights for do somethimng
  isAdmin: Boolean,
  wallet:{
    type:Number,
    required:true
  }
});

customerSchema.methods.generateAuthToken = function () {
  //return token idd and when admin it will return id and isAdmin:true
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, "privateKey"); //returns token
};

const Customer = mongoose.model("Customer", customerSchema);
function validateAgainstErrors(customer) {
  const schema = {
    firstName: Joi.string().min(0).max(255).required(),
    lastName: Joi.string().min(0).max(255).required(),
    phoneNumber: Joi.string()
      .length(11)
      .regex(/^01[0125][0-9]{8}$/gm)
      .required(),
    email: Joi.string().min(1).max(255).email().required(),//mo@yahoo.com
    password: Joi.string().min(5).max(255).required(),
    wallet:Joi.number().min(0).greater(0).required()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateAgainstErrors;
