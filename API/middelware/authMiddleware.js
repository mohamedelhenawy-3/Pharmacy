const { request } = require("express");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided!");
  const decoded = jwt.verify(token, "privateKey");
  //verify the token and give me the id and part pf /......
  req.user = decoded;
  //the id -- and lat that i have in customer
  req.token = decoded
 
  next();
};
