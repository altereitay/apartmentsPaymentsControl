import express, {Request, Response} from "express";
const router = express.Router();
import Payment from "../Schemes/Payment";
import {auth} from "../middlewares/auth";


/**
 * @route   POST /payments
 * @desc    create new payment
 * @access  public
 * */
//auth
//x-auth-token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyMzQ5MThhODVjZDJiYjRhZDYwOTU3In0sImlhdCI6MTY0Njc2MDAzMCwiZXhwIjoxNjQ3MTIwMDMwfQ.xrphyln9kX7asZfTBa4sc3uzmmkRtzB7q72Rq-m86GI"
router.post('/', auth, async (req: Request, res: Response)=>{
    const {apartmentID, user, amount} = req.body;
    if (amount <= 0){
        return res.status(400).json({msg: 'Amount cant be equal or below zero'});
    }
    try{
        await new Payment({apartmentID, user, amount}).save();
        res.status(200).json({msg: 'Payment added successfully'});
    }catch (err) {
        if(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
})

/**
 * @route   PATCH /payments/:id
 * @desc    create new payment
 * @access  public
 * */
router.patch('/:id', auth, async (req: Request, res: Response)=>{
    const {user, amount} = req.body;
    try{
        const payment = await Payment.findById(req.params.id);
        if (!payment){
            return res.status(404).json({msg: 'Payment has not found'});
        }
        if (amount <= 0){
            return res.status(400).json({msg: 'Amount cant be equal or below zero'});
        }
        if (payment.user.toString() !== user){
            return res.status(401).json({msg: 'Not authorized to edit this payment'});
        }
        payment.amount = amount;
        await payment.save();
        res.status(200).json({msg: 'Payment edited successfully'});
    }catch (err) {
        if(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
})

/**
 * @route   DELETE /payments/:id
 * @desc    create new payment
 * @access  public
 * */
router.delete('/:id', auth, async (req: Request, res: Response)=>{
    const {user} = req.body;
    try{
        const payment = await Payment.findById(req.params.id);
        if (!payment){
            return res.status(404).json({msg: 'Payment has not found'});
        }
        if (payment.user.toString() !== user){
            return res.status(401).json({msg: 'Not authorized to edit this payment'});
        }
        await payment.remove();
        res.status(200).json({msg: 'Payment removed successfully'});
    }catch (err) {
        if(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
})


export default router;
