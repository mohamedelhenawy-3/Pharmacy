const {Customer} = require('../models/customer');
const {Medicine} = require('../models//medicine');
exports.putPayment=async(req,res)=>{
    const neededUserData = await Customer.findById(req.token.id);
    const needMedicineData = await Medicine.findById(req.body.id);

    res.json(needMedicineData)    
    if( neededUserData.wallet >= needMedicineData.price){
        if(needMedicineData.countInStock >= req.body.count){    
            //reduce order price  from user
             const newWallet = neededUserData.wallet - (needMedicineData.price * req.body.count);
             await Customer.updateOne({_id: neededUserData.id},
                {$set: {wallet: newWallet}});
             await Medicine.updateOne({_id: needMedicineData.id},
                {$set: {countInStock: (needMedicineData.countInStock - req.body.count)}});
             res.json('Donee ');
        } else {
            res.json('Your order is not in found');
        }
    } else {
           res.json("You don't have  money ()");
    }
    
    
}
