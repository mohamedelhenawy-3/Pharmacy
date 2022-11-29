const Joi = require("joi");//val
const _ = require("lodash");//._pick
const bcrypt = require("bcrypt");//hashing
const { Customer } = require("../models/customer");
const express = require("express");
const router = express.Router();

//register
router.post("/login", async (req, res) => {
    // const result = validate(req.body);
  // if (result) return res.status(400).send(result.error.details[0].message);
  const { error } = validateAgainstErrors(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find user by one of his attributes
  let customer = await Customer.findOne({ email: req.body.email });
  if (!customer) return res.status(400).send("Email or Password invalid!!");

  const validPassword = await bcrypt.compare(
    req.body.password,
    customer.password
  );
  if (!validPassword)
  return res.status(400).send("Email or Password invalid!!");
 /// in sign-up and using in customer model--
 //token
  res.send(customer.generateAuthToken());
});

function validateAgainstErrors(customer) {
  const schema = {
    email: Joi.string().min(1).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(customer, schema);
}

module.exports = router;
