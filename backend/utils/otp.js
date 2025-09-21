import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import express from 'express'
dotenv.config()

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const sendEmailOTP = async(email , otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Institute Signup OTP',
        text: `Your OTP is ${otp}. It will expire in 2 minutes.`,
        
    })
}

