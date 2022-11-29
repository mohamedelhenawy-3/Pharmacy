//Lodash for mapping
const _ = require("lodash");
const { Medicine, validate } = require("../models/medicine");
const asyncHandler = require("express-async-handler");


const getMedicines = asyncHandler(async (req, res) => {

  res.status(200).send(await Medicine.find());

});
///////
const getMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);

  if (!medicine) return res.status(404).send("Medicine not found!");

  res.status(200).send(medicine);
});

//post /api/pharmacy/:id
const postMedicine = asyncHandler(async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let medicine = new Medicine(
    _.pick(req.body, ["name", "price", "countInStock", "expiryDate"])
  );
  medicine = await medicine.save(); //save it in db

  res.status(201).send(medicine);
 
});

//put
const updateMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);
  if (!medicine) return res.status(404).send("the medicne doesnt exist");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updateMedicine = await Medicine.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(201).send(updateMedicine);
});

const deleteMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findByIdAndRemove(req.params.id);
  if (!medicine) return res.status(404).send("the medicne does not ya expensive");
  res.status(204).send("Deleted sucesfully");
});

module.exports = {
  getMedicines,
  getMedicine,
  postMedicine,
  updateMedicine,
  deleteMedicine,
};
