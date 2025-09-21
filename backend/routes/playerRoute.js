import express from 'express'

const router = express.Router()
import Player from '../models/playerModel.js'
import upload from '../middleware/multer.js'
import bcrypt from 'bcrypt'
import { getLocationFromPincode, getCoords } from '../utils/apis.js'
import { sendEmailOTP } from '../utils/otp.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}   ;

router.post('/signup', upload.single('image'), async (req, res) => {
      try {
        const {name, email, phone, pincode, local, password, sports,gender} = req.body
        if(!name || !email || !phone || !pincode || !local || !password || !sports) {
            return res.status(400).json({message: 'All fields are required'})
        }
          
        const exist = await Player.findOne({email})
        if(exist) return res.status(400).json({message: 'Please Login'})
        const hashedPassword = await bcrypt.hash(password,10)
        const {state , district} = await getLocationFromPincode(pincode)
        const {latitude , longitude} = await getCoords(pincode)
        const emailOTP = generateOTP()
        const player = new Player({
            name,
            email,
            phone,
            address: {
                state,
                district,
                local,
                pincode,
                location: {latitude , longitude}
            },
            image: req.file ? req.file.path : '',
            sports: sports ? sports.split(',').map(s => s.trim()) : [],
            password: hashedPassword,
            gender,
            emailOTP,
            emailVerified:false,
            emailOTPExpiry: Date.now() + 2 * 60 * 1000 // 2 mins
        })
        await sendEmailOTP(email , emailOTP)
        await player.save()
        return res.status(200).json({message:'Player created successfully' , id:player._id , state:player.address.state , district:player.address.district})

      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server Error' });
      }
})

router.post('/login' , async(req , res)=> {
    try {
        const {email , password} = req.body
        const player = await Player.findOne({email}) 
        if(!player) return res.status(400).json({message: 'Please Signup'})
        const isMatch = await bcrypt.compare(password , player.password)
        if(!isMatch) return res.status(400).json({message: 'Invalid Credentials'})
        if(!player.emailVerified) {
              const emailOTP = generateOTP()
                  player.emailOTP = emailOTP
                  player.emailOTPExpiry = Date.now() + 2 * 60 * 1000
                  await player.save()
                  await sendEmailOTP(player.email, emailOTP)
          return res.status(200).json({ message: 'Email not verified', redirect: 'otp', playerId: player._id });
        }
          // If verified → issue token
            const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
            return res.status(200).json({
              message: 'Login successful',
              player,
              playerId: player._id,
              token,
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server Error' });
    }           
})

export default router