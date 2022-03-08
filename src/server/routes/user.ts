import express, {Request, Response} from "express";
const router = express.Router();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../Schemes/User';
const config =  require('../config.json');

/**
 * @route   POST /user/register
 * @desc    register a new user
 * @access  public
 * */
router.post('/register', async (req: Request, res: Response) => {
    const {userName, firstName, lastName, email, password, middleName = '', apartments = []} = req.body;
    try {
        let user = await User.findOne({userName});
        if(user){
            return res.status(400).json({msg:'Error, user name is taken'})
        }
        user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'Error, this email has been used'});
        }
        user = new User({userName, firstName, lastName, email, password, middleName, apartments});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(payload, config.jwtSecret, {expiresIn: 360000}, (err, token)=>{
            if (err){
                throw err;
            }
            res.json({msg:token})
        })
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

/**
 * @route   POST /user/login
 * @desc    register a new user
 * @access  public
 * */

router.post('/login', async (req: Request, res: Response)=>{
    const {userName, password} = req.body;
    try{
      let user = await User.findOne({userName});
      if (!user){
          return res.status(400).json({msg: `No username: ${userName} has found`});
      }
      const matchingPasswords = await bcrypt.compare(password, user.password);
      if(!matchingPasswords){
          return  res.status(400).json({msg: 'Password incorrect'});
      }
      const payload = {
          user: {
              id: user.id
          }
      }
        jwt.sign(payload, config.jwtSecret, {expiresIn: 360000}, (err, token)=>{
            if (err){
                throw err;
            }
            res.json({msg:token})
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



export default router;