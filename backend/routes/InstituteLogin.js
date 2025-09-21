import express from 'express'
import upload from '../middleware/multer.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { getCoords, getLocationFromPincode } from '../utils/apis.js'
import { sendEmailOTP } from '../utils/otp.js'
import Institute from '../models/InstituteModel.js'

const router = express.Router()

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

router.post('/signup' , upload.fields([
    {name: 'registration', maxCount: 1},
    {name: 'affiliation', maxCount: 1},
    {name: 'pan', maxCount:1},
    {name:'image',maxCount:1}
]) , async(req , res)=> {
    try {
         const {name , email , phone , pincode  , local , registrationNo , password ,forGirls,sports} = req.body
    const exist = await Institute.findOne({email})
    if(exist) return res.status(400).json({message: 'Please Login'})
        const hashedPassword = await bcrypt.hash(password,10)
    const docs = {
        registration: req.files['registration'] ? req.files['registration'][0].path : '',
        affiliation:req.files['affiliation'] ? req.files['affiliation'][0].path : '',
        pan: req.files['pan'] ? req.files['pan'][0].path : '',
        image: req.files['image'] ? req.files['image'][0].path : ''

    }
    const {state , district} = await getLocationFromPincode(pincode)
    const {latitude , longitude} = await getCoords(pincode)
     const emailOTP = generateOTP()
    const institution = new Institute({
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
        docs,
        forGirls,
        sports: sports ? sports.split(',').map(s => s.trim()) : [],
        registrationNo,
           password: hashedPassword,
      emailOTP,
      emailVerified:false,
        emailOTPExpiry: Date.now() + 2 * 60 * 1000 // 2 mins
    })
     await sendEmailOTP(email , emailOTP)
await institution.save()
return res.status(200).json({message:'Institute created successfully' , id:institution._id , state:institution.address.state , district:institution.address.district})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error' , error: error.message})
    }
   
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all requirements' })
    }

    const user = await Institute.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Please sign up first' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password' })
    }

    if (!user.emailVerified) {
      // Send OTP again (optional)
      const emailOTP = generateOTP()
      user.emailOTP = emailOTP
      user.emailOTPExpiry = Date.now() + 2 * 60 * 1000
      await user.save()
      await sendEmailOTP(user.email, emailOTP)

      // Tell frontend to redirect to OTP
      return res.status(200).json({
        message: 'Email not verified. OTP sent again.',
        redirect: 'otp',
        userId: user._id,
      })
    }

    // If verified → issue token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).json({
      message: 'Login successful',
      user,
      userId: user._id,
      token,
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
})

export default router