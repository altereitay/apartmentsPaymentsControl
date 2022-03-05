const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = require('../Schemes/User');
const config = require('../config.json')

/**
 * @route   POST /user/register
 * @desc    register a new user
 * @access  public
 * */
router.post('/register', async (req, res) => {
    console.log(req.body);
    const {userName, firstName, lastName, email, password, middleName = '', apartments = []} = req.body;
    try {
        let user = await userSchema.findOne({userName});
        if(user){
            return res.status(400).json({msg:'Error, user name is taken'})
        }
        user = await userSchema.findOne({email});
        if(user){
            return res.status(400).json({msg:'Error, this email has been used'});
        }
        user = new userSchema({userName, firstName, lastName, email, password, middleName, apartments});
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

module.exports = router;

