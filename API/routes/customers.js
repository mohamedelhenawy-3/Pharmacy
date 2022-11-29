const _ = require("lodash");//package _.pick 
const bcrypt = require("bcrypt");
const { Customer, validate } = require("../models/customer");
const express = require("express");

const router = express.Router();

//register
router.post("/", async (req, res) => {  
  // const result = validate(req.body);
  // if (result) return res.status(400).send(result.error);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //find one search in db if the customer in db or no if find send aleady exist 
   let customer = await Customer.findOne({ email: req.body.email });
  if (customer) return res.status(400).send("Customer already exists!");

  customer = new Customer(
    //const firstname= req.body.firstname
    _.pick(req.body, [
      "firstName",
      "lastName",
      "phoneNumber",
      "email",
      "password",
      'wallet'
    ])
  );
  
  const salt = await bcrypt.genSalt(10);                    //#####RRRTTRTWRTRjkbhwuigybvrfhjvuer###%#

  //salt for add ######## when using hash pass 
  customer.password = await bcrypt.hash(customer.password, salt);
  await customer.save();

  //For make the user register and created the token by the way
  res
    .header("x-auth-token", customer.generateAuthToken())
    .status(200)
    .send(_.pick(req.body, ["firstName", "lastName", "phoneNumber", "email",'wallet'])); //send token//................................
});

module.exports = router;
