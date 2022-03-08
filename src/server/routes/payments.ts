import express, {Request, Response} from "express";
const router = express.Router();
import Payment from "../Schemes/Payment";
import {auth} from "../middlewares/auth";


/**
 * @route   POST /payment
 * @desc    create new payment
 * @access  public
 * */
router.post('/', auth, async (req: Request, res: Response)=>{
    const {apartmentID, user, amount} = req.body;
    if (amount <= 0){
        return res.status(400).json({msg: 'Amount cant be equal or below zero'});
    }
    try{
        await Payment.create({})
    }

})


export default router;